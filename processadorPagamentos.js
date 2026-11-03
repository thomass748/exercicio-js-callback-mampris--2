function processarTransacaoPix(chavePix, valor, callbackAcao) {
  if (valor <= 0) {
    console.error(`❌ [ERRO] Valor de R$ ${valor.toFixed(2)} é inválido para a transação PIX (Chave: ${chavePix}). Transação abortada.\n`);
    return;
  }

  const transacao = {
    id: Math.floor(Math.random() * 100000),
    chavePix,
    valor,
    data: new Date().toLocaleTimeString()
  };

  console.log(`⚡ [PROCESSANDO] Transação #${transacao.id} gerada com sucesso em ${transacao.data}.`);


  callbackAcao(transacao);
}



function emitirComprovantePorEmail(transacao) {
  const { id, valor, chavePix } = transacao;
  console.log(`📧 [E-MAIL] Comprovante enviado com sucesso! Transação #${id} | Valor: R$ ${valor.toFixed(2)} | Chave PIX: ${chavePix}\n`);
}

function creditarCashback(transacao) {
  const { id, valor } = transacao;
  const cashback = valor * 0.02;
  console.log(`💰 [CASHBACK] Transação #${id} de R$ ${valor.toFixed(2)} | Bônus de 2% creditado: R$ ${cashback.toFixed(2)}\n`);
}

function auditarTransacaoSuspeita(transacao) {
  const { id, valor } = transacao;
  if (valor > 5000) {
    console.warn(`🚨 [BANDEIRA VERMELHA] Transação #${id} no valor de R$ ${valor.toFixed(2)} excede o limite de R$ 5.000,00! Encaminhada para auditoria antifraude.\n`);
  } else {
    console.log(`✅ [AUDITORIA] Transação #${id} de R$ ${valor.toFixed(2)} aprovada dentro dos limites normais de segurança.\n`);
  }
}


function enviarWebhookAssincrono(transacao, callbackFinalizacao) {
  console.log(`⏳ [WEBHOOK - AGENDADO] Enviando notificação externa da transação #${transacao.id}... (Aguardando 2000ms)`);
  setTimeout(() => {
    console.log(`🌐 [WEBHOOK - CONCLUÍDO] Resposta recebida da loja externa para a transação #${transacao.id}!`);
    callbackFinalizacao(transacao);
  }, 2000);
}


console.log("=================================================");
console.log("💳 PAYFAST SOLUTIONS - PROCESSADOR DE TRANSAÇÕES");
console.log("=================================================\n");


processarTransacaoPix("usuario@invalido.com", -10.00, emitirComprovantePorEmail);

processarTransacaoPix("joao.silva@email.com", 150.00, emitirComprovantePorEmail);

processarTransacaoPix("maria.souza@email.com", 450.00, creditarCashback);

processarTransacaoPix("empresa.parceira@pix.com", 7500.00, auditarTransacaoSuspeita);

processarTransacaoPix("cliente.desconto@email.com", 100.00, (transacao) => {
  const valorComDesconto = transacao.valor - 5.00;
  console.log(`🏷️ [DESCONTO INLINE] Transação #${transacao.id}: Desconto de R$ 5,00 aplicado. Valor final cobrado: R$ ${valorComDesconto.toFixed(2)}\n`);
});

const transacaoWebhook = {
  id: 99999,
  chavePix: "loja.ecommerce@pagamentos.com",
  valor: 1250.00,
  data: new Date().toLocaleTimeString()
};

enviarWebhookAssincrono(transacaoWebhook, (transacao) => {
  console.log(`🏁 [FINALIZAÇÃO] Callback de término executada: Pedido associado à transação #${transacao.id} foi liberado na loja parceira.\n`);
});

console.log("📌 [FLUXO SÍNCRONO FINALIZADO] A thread principal concluiu. Aguardando a conclusão do Webhook assíncrono...\n");
