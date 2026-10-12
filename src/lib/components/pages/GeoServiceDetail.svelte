<script lang="ts">
  let { contactRoute }: { contactRoute: string } = $props()
</script>

<div class="geo-detail">
  <section class="geo-section" id="geo-scope" aria-labelledby="geo-scope-title">
    <div class="geo-wrap">
      <p class="geo-label">Escopo da auditoria</p>
      <h2 id="geo-scope-title">O que compradores perguntam e quem aparece nas respostas?</h2>
      <p class="geo-lead">A linha de base começa com perguntas de compra definidas para o mercado brasileiro. Para cada execução, registramos a plataforma e o modo consultados, a data, as fontes exibidas e se a resposta menciona, cita ou recomenda a empresa.</p>
      <div class="geo-grid">
        <article>
          <h3>Perguntas de compra</h3>
          <p>Selecionamos perguntas ligadas à escolha de um serviço de GEO, aos critérios de contratação e às dúvidas sobre escopo. Mantemos a pergunta e o idioma estáveis nas comparações.</p>
        </article>
        <article>
          <h3>Inclusão de concorrentes</h3>
          <p>Definimos antes da medição quais empresas comparar e o que conta como menção, citação com link ou recomendação. Uma amostra descreve apenas as respostas observadas, não todo o mercado.</p>
        </article>
        <article>
          <h3>Condições registradas</h3>
          <p>Guardamos pergunta exata, país, idioma, data, plataforma, modelo quando identificado, modo de busca, resposta e fontes visíveis. Falhas e campos indisponíveis permanecem explícitos.</p>
        </article>
      </div>
    </div>
  </section>

  <section class="geo-section geo-section--paper" id="geo-access" aria-labelledby="geo-access-title">
    <div class="geo-wrap geo-split">
      <div>
        <p class="geo-label">Acesso e fatos da marca</p>
        <h2 id="geo-access-title">Primeiro, verificamos se as páginas podem ser acessadas e entendidas.</h2>
      </div>
      <div class="geo-copy">
        <p>Conferimos resposta HTTP, redirecionamentos, robots.txt, renderização do conteúdo principal, links internos, URL canônica e versões de idioma. Também comparamos nome, serviços, mercado atendido, preços e limites publicados com as fontes oficiais fornecidas pela empresa.</p>
        <p>As regras variam por plataforma. O Google informa que resultados em AI Overviews e AI Mode dependem dos requisitos normais de indexação e snippet, sem arquivo ou marcação GEO especial. Para ChatGPT Search e Perplexity, avaliamos separadamente as regras documentadas para seus rastreadores de busca. <a href="https://developers.google.com/search/docs/appearance/ai-features" target="_blank" rel="noopener">Orientação do Google sobre recursos de IA</a>, <a href="https://developers.openai.com/api/docs/bots" target="_blank" rel="noopener">documentação de rastreadores da OpenAI</a> e <a href="https://docs.perplexity.ai/docs/resources/perplexity-crawlers" target="_blank" rel="noopener">documentação de rastreadores da Perplexity</a>.</p>
        <p>Dados estruturados, quando aplicáveis, precisam corresponder ao que a página mostra; sua validade não garante exibição. <a href="https://developers.google.com/search/docs/appearance/structured-data/sd-policies" target="_blank" rel="noopener">Políticas do Google para dados estruturados</a>.</p>
      </div>
    </div>
  </section>

  <section class="geo-section" id="geo-original" aria-labelledby="geo-original-title">
    <div class="geo-wrap geo-split">
      <div>
        <p class="geo-label">Respostas e corroboração</p>
        <h2 id="geo-original-title">Melhoramos a fonte; não fabricamos prova.</h2>
      </div>
      <div class="geo-copy">
        <p>Com base nos fatos aprovados, organizamos respostas originais às dúvidas de compradores, explicamos critérios e limites do serviço e indicamos a fonte que sustenta cada afirmação importante. Quando faltam dados, o ponto vira uma pendência de verificação.</p>
        <p>Também distinguimos informações publicadas pela própria empresa de confirmações independentes, como documentação de terceiros ou cobertura editorial. Repetir uma afirmação em páginas controladas pela mesma empresa não a torna uma validação independente. Não publicamos resultados de clientes, credenciais ou depoimentos sem comprovação e autorização.</p>
      </div>
    </div>
  </section>

  <section class="geo-section geo-example" id="geo-audit-example" aria-labelledby="geo-example-title">
    <div class="geo-wrap">
      <p class="geo-label">Demonstração sintética, sem consulta executada</p>
      <h2 id="geo-example-title">Como um registro de visibilidade pode ser inspecionado</h2>
      <p class="geo-copy">Os dados abaixo ilustram o formato de registro. Não são uma resposta real, medição da ADM ou resultado de cliente.</p>
      <div class="geo-table-scroll">
        <table>
          <caption>Exemplo sintético, sem consulta executada</caption>
          <thead>
            <tr><th scope="col">Pergunta (sintética)</th><th scope="col">Mercado</th><th scope="col">Data do cenário</th><th scope="col">Plataforma e modelo</th><th scope="col">Fonte observada</th><th scope="col">Incerteza</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>“Quais critérios uma empresa no Brasil deve comparar antes de contratar um serviço de GEO?”</td>
              <td>Brasil, pt-BR</td>
              <td>11/10/2026, data ilustrativa</td>
              <td>ChatGPT Search; versão do modelo não registrada. Nenhuma execução foi feita.</td>
              <td>Nenhuma. Sem execução, não há resposta nem URL citada para inspecionar.</td>
              <td>Todos os valores são sintéticos. Não indicam inclusão, recomendação, citação ou desempenho.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="geo-method">Em uma medição real, o registro preserva a captura autorizada da resposta e as URLs mostradas. Menção, citação, recomendação e visita referida são classificadas separadamente.</p>
    </div>
  </section>

  <section class="geo-section geo-section--paper" id="geo-reporting" aria-labelledby="geo-reporting-title">
    <div class="geo-wrap geo-split">
      <div>
        <p class="geo-label">O que o relatório mostra</p>
        <h2 id="geo-reporting-title">Observações verificáveis, com limites explícitos.</h2>
      </div>
      <div class="geo-copy">
        <p>Podemos relatar acessibilidade técnica verificada, consistência das informações da marca, perguntas testadas, concorrentes observados, menções, links citados, precisão factual e mudanças entre capturas comparáveis. Se houver acesso à propriedade, o Bing Webmaster Tools também oferece um relatório de citações em respostas de IA; a própria Microsoft o descreve como observacional, não como ranking, tráfego ou nota de qualidade. <a href="https://blogs.bing.com/search/2026/6/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare/" target="_blank" rel="noopener">Como funciona o relatório AI Performance do Bing</a>.</p>
        <p>Uma amostra manual não representa todas as perguntas, usuários, localidades ou versões de modelos. Não controlamos a recuperação interna nem podemos garantir rastreamento, indexação, citação, recomendação, posição, tráfego ou vendas. O Google também esclarece que cumprir requisitos não garante rastreamento, indexação ou exibição. <a href="https://developers.google.com/search/docs/appearance/ai-features" target="_blank" rel="noopener">Requisitos e limites descritos pelo Google</a>.</p>
        <p>As métricas de citações não substituem consultas qualificadas. O relatório separa sinais de busca e respostas de IA dos contatos e oportunidades comerciais que a empresa consegue confirmar.</p>
        <p><a class="geo-cta" href={contactRoute}>Converse com a ADM sobre o escopo do seu caso</a></p>
      </div>
    </div>
  </section>

  <section class="geo-section geo-faq" id="geo-faq" aria-labelledby="geo-faq-title">
    <div class="geo-wrap geo-split">
      <div>
        <p class="geo-label">Perguntas frequentes</p>
        <h2 id="geo-faq-title">Antes de contratar GEO</h2>
      </div>
      <div class="geo-faq-list">
        <details>
          <summary>GEO garante que minha empresa será citada por uma IA?<span aria-hidden="true">+</span></summary>
          <p>Não. O trabalho pode corrigir fatos, melhorar o acesso e preparar respostas úteis, mas cada plataforma decide o que rastrear, recuperar e exibir. A auditoria relata as condições testadas e não promete inclusão ou resultado comercial.</p>
        </details>
        <details>
          <summary>Uma menção, uma citação e uma recomendação são a mesma coisa?<span aria-hidden="true">+</span></summary>
          <p>Não. Menção é o nome no texto; citação é uma fonte apresentada, normalmente com link; recomendação é a inclusão entre as opções sugeridas. O relatório registra essas ocorrências separadamente e não presume que geraram uma visita ou venda.</p>
        </details>
        <details>
          <summary>É obrigatório publicar llms.txt ou dados estruturados para aparecer no Google?<span aria-hidden="true">+</span></summary>
          <p>O Google informa que não exige arquivos ou marcação especiais para AI Overviews ou AI Mode. A equipe verifica cada recurso pela documentação atual e só recomenda uma implementação quando ela atende a uma necessidade concreta. Nenhum arquivo garante citações.</p>
        </details>
        <details>
          <summary>Como vocês comparam a presença de concorrentes?<span aria-hidden="true">+</span></summary>
          <p>Definimos as perguntas, o mercado, as plataformas e o critério de inclusão antes da coleta. Comparamos as respostas registradas sob essas condições. Como as respostas podem variar, a amostra é descrita com seu tamanho, período e limitações, sem ser apresentada como participação total de mercado.</p>
        </details>
      </div>
    </div>
  </section>
</div>

<style>
  .geo-detail { background: var(--paper); color: var(--ink); }
  .geo-wrap { width: 100%; max-width: 1220px; margin-inline: auto; }
  .geo-section { padding: clamp(56px, 7vw, 96px) var(--pad-r) clamp(56px, 7vw, 96px) var(--pad-l); scroll-margin-top: 100px; }
  .geo-section--paper, .geo-faq { background: #e8e4dc; }
  .geo-label { margin: 0 0 18px; color: var(--verm-deep); font-family: 'ADM Semi', sans-serif; font-size: 11px; letter-spacing: .14em; line-height: 1.5; text-transform: uppercase; }
  h2 { max-width: 25ch; margin: 0 0 24px; font-family: 'ADM Display', sans-serif; font-size: clamp(28px, 3.2vw, 44px); font-weight: 400; letter-spacing: -.03em; line-height: 1.12; }
  h3 { margin: 0 0 12px; font-family: 'ADM Semi', sans-serif; font-size: 19px; line-height: 1.3; }
  .geo-copy, .geo-grid p, .geo-lead, .geo-method { color: #343330; font-size: 16px; line-height: 1.75; }
  .geo-copy p, .geo-grid p, .geo-method { margin: 0 0 18px; }
  .geo-copy p:last-child, .geo-method { margin-bottom: 0; }
  .geo-copy a { color: var(--verm-deep); text-decoration: underline; text-underline-offset: .2em; }
  .geo-lead { max-width: 74ch; margin: 0 0 32px; font-size: 18px; }
  .geo-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 28px; }
  .geo-grid article { min-width: 0; border-top: 1px solid var(--ink-faint); padding-top: 18px; }
  .geo-split { display: grid; grid-template-columns: minmax(220px, .8fr) minmax(0, 1.2fr); gap: clamp(32px, 7vw, 100px); align-items: start; }
  .geo-example { background: var(--ink); color: var(--paper); }
  .geo-example .geo-label { color: #ff8272; }
  .geo-example .geo-copy, .geo-example .geo-method { color: #d8d4cd; }
  .geo-table-scroll { max-width: 100%; margin: 28px 0 18px; overflow-x: auto; overscroll-behavior-inline: contain; }
  table { width: 100%; min-width: 920px; border-collapse: collapse; font-size: 14px; line-height: 1.55; }
  th, td { width: 16.66%; border: 1px solid rgba(242, 239, 233, .24); padding: 14px; text-align: left; vertical-align: top; overflow-wrap: anywhere; }
  th { color: #ffb0a7; font-family: 'ADM Semi', sans-serif; }
  .geo-example .geo-copy { max-width: 75ch; }
  .geo-cta { display: inline-flex; min-height: 48px; align-items: center; padding: 12px 18px; background: var(--verm-deep); color: var(--paper) !important; font-family: 'ADM Semi', sans-serif; text-decoration: none !important; }
  .geo-faq-list details { border-top: 1px solid var(--ink-faint); }
  .geo-faq-list details:last-child { border-bottom: 1px solid var(--ink-faint); }
  .geo-faq-list summary { display: flex; justify-content: space-between; gap: 20px; align-items: baseline; padding-block: 21px; font-family: 'ADM Semi', sans-serif; line-height: 1.5; cursor: pointer; list-style: none; }
  .geo-faq-list summary::-webkit-details-marker { display: none; }
  .geo-faq-list summary span { flex: 0 0 auto; color: var(--verm-deep); font-family: ui-monospace, monospace; font-size: 23px; line-height: 1; transition: transform 180ms; }
  .geo-faq-list details[open] summary span { transform: rotate(45deg); }
  .geo-faq-list p { margin: 0; padding: 0 0 21px; color: #343330; font-size: 15px; line-height: 1.7; }
  @media (max-width: 760px) {
    .geo-grid { grid-template-columns: 1fr; gap: 20px; }
    .geo-split { grid-template-columns: 1fr; gap: 20px; }
    .geo-section { padding-block: 52px; }
    .geo-lead { font-size: 16px; }
    .geo-table-scroll { margin-inline: calc(-1 * var(--pad-l)); padding-inline: var(--pad-l); }
  }
</style>
