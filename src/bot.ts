import { Client, GatewayIntentBits, Message } from 'discord.js';
import * as dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import axios from 'axios';
import path from 'path';

// Cargar variables de entorno
dotenv.config();

// Crear el cliente del bot
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

// Servidor HTTP para mantener el bot activo
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('El bot está activo y escuchando.');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Evento: Cuando el bot se conecta
client.once('ready', () => {
  if (client.user) {
    console.log(`Bot conectado como ${client.user.tag}`);
  }
});

// Evento: Detectar mensajes
client.on('messageCreate', async (message) => {
  // Ignorar mensajes del propio bot
  if (message.author.bot) return;

  // Verificar si el mensaje contiene #bot y responder con "Hola bot"
  if (message.content.includes('#bot')) {
    await message.reply('Hola bot');
  }
});

// Iniciar el bot
client.login(process.env.DISCORD_TOKEN);
