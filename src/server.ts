import express from 'express';
// 1 Importamos o Prisma Client
import { PrismaClient } from '@prisma/client';

// 2 Criamos uma instância do Prisma
const prisma = new PrismaClient();

const app = express();
const port = 3000;

// 3 Adicionamos o middleware para o Express entender JSON
app.use(express.json());

// Rota de teste que já tínhamos
app.get('/', (req, res) => {
  res.send('A API está funcionando!');
});

// 4 ROTA DE CADASTRO (POST) QUE ESTAVA FALTANDO
app.post('/users', async (req, res) => {
  try {
    const { email, password } = req.body;

    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: password, // Lembrete: ainda vamos criptografar isso
      },
    });

    // Retorna o usuário criado com o status 201 (Created)
    res.status(201).json(newUser);
  } catch (_error) {
    // Se der um erro (ex: email já existe), retorna um erro
    res.status(400).json({
      error: 'Não foi possível criar o usuário. O email pode já estar em uso.',
    });
  }
});

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});
