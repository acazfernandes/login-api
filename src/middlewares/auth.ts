import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'; // <- MUDANÇA 1: Importamos o objeto principal

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({ error: 'Token não fornecido.' });
  }
  
  const [, token] = authToken.split(' ');

  try {
    // MUDANÇA 2: Usamos jwt.verify em vez de apenas verify
    const { sub } = jwt.verify(token, process.env.JWT_SECRET as string) as IPayload;

    // @ts-ignore
    request.userId = sub;

    return next();
  } catch (err) {
    return response.status(401).json({ error: 'Token inválido.' });
  }
}