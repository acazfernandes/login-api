import express from 'express';
import { PrismaClient } from '@prisma/client';
import { hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken'; // <- MUDANÇA 1: Importação corrigida

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('A API está funcionando!');
});

// ROTA DE CADASTRO (POST /users)
app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const password_hash = await hash(password, 8);
    const newUser = await prisma.user.create({
      data: { name, email, password_hash },
    });

    const userWithoutPassword = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt
    }
    res.status(201).json(userWithoutPassword);
  } catch (_error) {
    res.status(400).json({
      error: 'Não foi possível criar o usuário. O email pode já estar em uso.',
    });
  }
});

// ROTA DE LOGIN (POST /sessions)
app.post('/sessions', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(400).json({ error: 'Credenciais inválidas.' });
    }

    const passwordMatch = await compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(400).json({ error: 'Credenciais inválidas.' });
    }

    // MUDANÇA 2: Usamos jwt.sign em vez de apenas sign
    const token = jwt.sign(
      { name: user.name, email: user.email },
      process.env.JWT_SECRET as string,
      {
        subject: user.id,
        expiresIn: '1d',
      }
    );
    
    return res.status(200).json({ token });

  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});