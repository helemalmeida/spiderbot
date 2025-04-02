Usei como referencia o vídeo https://www.youtube.com/watch?v=MdZFR2op_mg, mas existem alguns pontos que diferenciam meu projeto do original: 

1. Organização e estruturação 
- mais compacto e organizado, utilizando um objeto respostas para armazenar todas as respostas, reduzindo a repetição de código;
- if (!msg.from.endsWith('@c.us')) return; no início para filtrar mensagens de números de celular de forma mais clara;
- Regex melhor estruturada para validar palavras-chave: /^(Momo|Benzinho|Calango|TesteTI)$/i.test(msg.body), garantindo que só mensagens que correspondem exatamente às palavras-chave sejam consideradas.

2. Eficiência
- um dicionário (respostas) para armazenar todas as respostas, permitindo um único bloco de código para verificar e responder mensagens;
- o delay só é aplicado uma vez antes de enviar a mensagem correspondente.

3. Simulação de Digitação
- mantém o uso do chat.sendStateTyping(), mas de forma mais organizada e sem repetições desnecessárias.
