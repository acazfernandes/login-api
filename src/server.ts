import express from 'express';
import { PrismaClient } from '@prisma/client';
import { hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ensureAuthenticated } from './middlewares/auth'; // Importamos o middleware

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(express.json());

// --- ROTAS PÚBLICAS (não precisam de login) ---
app.post('/users', async (req, res) => {
  // (código de cadastro que você já tem)
  try {
    const { name, email, password } = req.body;
    const password_hash = await hash(password, 8);
    const newUser = await prisma.user.create({
      data: { name, email, password_hash },
    });
    const userWithoutPassword = { id: newUser.id, name: newUser.name, email: newUser.email, createdAt: newUser.createdAt, updatedAt: newUser.updatedAt };
    res.status(201).json(userWithoutPassword);
  } catch (_error) {
    res.status(400).json({ error: 'Não foi possível criar o usuário. O email pode já estar em uso.' });
  }
});

app.post('/sessions', async (req, res) => {
  // (código de login que você já tem)
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) { return res.status(400).json({ error: 'Credenciais inválidas.' }); }
    const passwordMatch = await compare(password, user.password_hash);
    if (!passwordMatch) { return res.status(400).json({ error: 'Credenciais inválidas.' }); }
    const token = jwt.sign(
      { name: user.name, email: user.email },
      process.env.JWT_SECRET as string,
      { subject: user.id, expiresIn: '1d' }
    );
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// --- ROTAS PROTEGIDAS (precisam de login) ---
app.get('/me', ensureAuthenticated, async (request, response) => {
  // Se a requisição chegou até aqui, o middleware ensureAuthenticated já validou o token.

  // @ts-ignore
  const userId = request.userId; // Pegamos o ID do usuário que o middleware injetou

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  // Retorna os dados do usuário (sem a senha)
  const userWithoutPassword = { id: user?.id, name: user?.name, email: user?.email, createdAt: user?.createdAt, updatedAt: user?.updatedAt };

  return response.status(200).json(userWithoutPassword);
});

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});