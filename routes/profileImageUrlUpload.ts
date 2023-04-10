import fs from 'fs';
import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/user';
import { getErrorMessage } from '../lib/utils';
import { authenticatedUsers } from '../lib/insecurity';
import request from 'request';
import logger from '../lib/logger';
import url from 'url';

export default function profileImageUrlUpload() {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const imageUrl = req.body.imageUrl;
      if (!imageUrl) {
        throw new Error('Missing image URL');
      }

      const parsedUrl = url.parse(imageUrl);
      const hostname = parsedUrl.hostname;
      const pathname = parsedUrl.pathname;

      const allowedHosts = ['example.com', 'trustedhost.com'];
      if (!allowedHosts.includes(hostname)) {
        throw new Error('Invalid image URL');
      }

      if (pathname.includes('..')) {
        throw new Error('Invalid image URL');
      }

      if (pathname.match(/(.)*solve\/challenges\/server-side(.)*/) !== null) {
        req.app.locals.abused_ssrf_bug = true;
      }

      const loggedInUser = authenticatedUsers.get(req.cookies.token);
      if (!loggedInUser) {
        throw new Error('Unauthorized');
      }

      const imageRequest = request.get(imageUrl);
      const ext = ['jpg', 'jpeg', 'png', 'svg', 'gif'].includes(parsedUrl.pathname.split('.').slice(-1)[0].toLowerCase()) ? parsedUrl.pathname.split('.').slice(-1)[0].toLowerCase() : 'jpg';
      const imagePath = `frontend/dist/frontend/assets/public/images/uploads/${loggedInUser.data.id}.${ext}`;
      const imageUrlPath = `/assets/public/images/uploads/${loggedInUser.data.id}.${ext}`;

      imageRequest.on('error', (err: Error) => {
        logger.warn(`Error retrieving user profile image: ${getErrorMessage(err)}; using image link directly`);
        UserModel.findByPk(loggedInUser.data.id).then(async (user: UserModel | null) => {
          if (user) {
            await user.update({ profileImage: imageUrl });
          }
        }).catch((error: Error) => {
          next(error);
        });
      });

      imageRequest.on('response', (response) => {
        if (response.statusCode === 200) {
          imageRequest.pipe(fs.createWriteStream(imagePath));
          UserModel.findByPk(loggedInUser.data.id).then(async (user: UserModel | null) => {
            if (user) {
              await user.update({ profileImage: imageUrlPath });
            }
          }).catch((error: Error) => {
            next(error);
          });
        } else {
          UserModel.findByPk(loggedInUser.data.id).then(async (user: UserModel | null) => {
            if (user) {
              await user.update({ profileImage: imageUrl });
            }
          }).catch((error: Error) => {
            next(error);
          });
        }
      });

      res.location(process.env.BASE_PATH + '/profile');
      res.redirect(process.env.BASE_PATH + '/profile');
    } catch (error) {
      next(error);
    }
  };
}