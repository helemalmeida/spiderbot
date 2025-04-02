const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();

// Serviço de leitura do QR Code
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

// Confirmação de conexão
client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});

client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms));

// Funil
client.on('message', async msg => {
    if (!msg.from.endsWith('@c.us')) return;
    
    const chat = await msg.getChat();
    const contact = await msg.getContact();
    const name = contact.pushname.split(" ")[0];
    
    // Verificação de palavra-chave exata
    if (/^(Momo|Benzinho|Calango|TesteTI)$/i.test(msg.body)) {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, `Oi, ${name}. Meu nome é Spider, eu sou o assistente virtual da Helem.\n\nComo posso ajudá-lo hoje? Digite uma das opções abaixo:\n\n1 - Ir no supermercado\n2 - Pix\n3 - Me buscar\n4 - Falar com a Helem\n5 - Outra opção\n\nLembre-se que a Helem está no trabalho e pode demorar para responder, por isso eu fui desenvolvido.`);
        return;
    }

    const respostas = {
        '1': `O que você gostaria que comprasse?\n\nFaça uma lista detalhada. Se preferir alguma marca, coloque na frente do item, junto com a quantidade e marca.\n\nPor exemplo:\nSuco 1,9L, laranja e acerola, 2, Prates\nPão de forma, integral, 1, Pullman`,
        '2': `Qual a chave Pix?\nQual o nome do destinatário?\nQual o valor?\nQual o motivo da transferência?`,
        '3': `Qual o endereço para te buscar?\nTem ponto de referência?\nQual o horário?`,
        '4': `Peço que aguarde um instante, ela irá responder em breve.`,
        '5': `Pode descrever o que precisa e assim que possível ela vai te retornar.`
    };
    
    if (respostas[msg.body]) {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, respostas[msg.body]);
    }
});