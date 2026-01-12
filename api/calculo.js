export default function handler(req, res) {
  const texto = req.body.texto?.toLowerCase() || '';

  let cor = texto.includes('amarelo') ? 'amarelo'
          : texto.includes('laranja') ? 'laranja'
          : 'outras';

  let placa = texto.includes('sem') ? 'sem' : 'com';

  const matchQtd = texto.match(/\d+/);
  const quantidade = matchQtd ? Number(matchQtd[0]) : 0;

  if (!quantidade) {
    return res.json({
      mensagem: '❌ Não consegui identificar a quantidade. Envie um número.'
    });
  }

  let valorUnitario = (cor === 'amarelo' || cor === 'laranja') ? 69.9 : 95;
  if (placa === 'sem') valorUnitario -= 30;

  const total = valorUnitario * quantidade;

  return res.json({
    mensagem: `🧾 Resumo do seu pedido:\n\n• Quantidade: ${quantidade}\n• Cor: ${cor}\n• Placa: ${placa}\n\n💰 Valor unitário: R$ ${valorUnitario.toFixed(2)}\n💵 Valor total: R$ ${total.toFixed(2)}\n\nDeseja confirmar o pedido?`
  });
}
