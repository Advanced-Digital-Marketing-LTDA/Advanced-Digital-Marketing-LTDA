---
title: "Slop Benchmark: comparação de 21 repositórios de vídeo com IA agêntica"
meta_title: "Slop Benchmark: 21 repositórios de vídeo com IA agêntica"
meta_description: "Comparamos backlog e atividade no GitHub de 21 repositórios de vídeo com IA agêntica, com gráfico e análise de threads de issues selecionadas."
published: "2026-10-30"
updated: "2026-10-30"
---

Um projeto pode ter milhões de estrelas e ainda assim fazer você passar a tarde depurando. O Slop Benchmark compara de forma direta o backlog público visível com a atividade de releases e de pull requests mesclados. Não é uma nota de qualidade de código, uma auditoria de segurança nem uma previsão de que um projeto vai fracassar. Funciona como um medidor rápido de pressão. Depois, analisamos issues abertas selecionadas para entender o que as discussões representam.

## O que a razão pode e não pode dizer

Os 21 repositórios independentes incluem editores, motores headless, pontes para editores comerciais, skills de agentes e frameworks de pesquisa ou produção. Eles não são editores de vídeo completos e intercambiáveis. Não instalamos nem executamos nenhum repositório para esta comparação; os recursos descritos abaixo são alegações da documentação, não comportamento testado.

Coletamos o snapshot das pontuações em 30 de outubro de 2026, 15:32:03–15:35:40 UTC, com rótulos de lote 15:34 e 15:36 UTC. A coleta é sequencial, não atômica. As issues abertas excluem PRs. Os registros de releases publicadas no GitHub incluem pré-lançamentos e excluem rascunhos. Os PRs abertos incluem rascunhos; os PRs fechados sem mesclagem aparecem em uma coluna separada e ficam fora do denominador de B.

> **A = issues abertas ÷ releases publicadas**
>
> **B = (issues abertas + PRs abertos) ÷ total de PRs mesclados desde a criação**
>
> **C = (A + B) ÷ 2 quando há releases; caso contrário, C = B. Slop Log Score = log10(1 + C)**

Se não houver releases, A aparece como N/A e C = B; isso não significa que o A ausente seja zero. Repositórios com menos de 30 PRs mesclados desde a criação ficam de fora, então todos os repositórios listados têm B. Os cálculos usam razões sem arredondamento; os componentes aparecem com duas casas decimais e o Slop Log Score com quatro. Um valor menor indica menos backlog público em relação a esses denominadores, não prova de edição confiável. Práticas de release, tipos de issue e idade do projeto afetam a pontuação.

Para a verificação qualitativa, selecionamos até três issues atualmente abertas, atualizadas desde 30 de abril, por repositório. Excluímos PRs e ordenamos por número de comentários e depois pelo número da issue, em ordem decrescente. Analisamos o corpo das issues e os comentários disponíveis em 30 de outubro; esta análise não afirma cobertura completa do histórico de comentários. As threads abertas incluem suporte, propostas e ruído administrativo, além de relatos de problemas; a ausência de uma thread qualificada não significa software sem bugs.

## A tabela comparativa

A coluna Basis diferencia os casos com as duas medidas disponíveis dos projetos sem releases, calculados só com B. As estrelas servem de contexto e não entram no cálculo da pontuação.

| Projeto | Categoria | Estrelas no GitHub | Issues abertas | PRs abertos | PRs mesclados | Fechados sem mesclar | Releases | A | B | C | Slop Log Score | Base |
|:--|:--|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|:--|
| [MBehtemam/Montagent](https://github.com/MBehtemam/Montagent) | motor de edição headless | 3 | 74 | 0 | 421 | 6 | 9 | 8.22 | 0.18 | 4.20 | 0.7159 | A + B |
| [video-db/Director](https://github.com/video-db/Director) | Orquestrador de produção em nuvem | 1,568 | 8 | 13 | 120 | 27 | 1 | 8.00 | 0.18 | 4.09 | 0.7065 | A + B |
| [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) | Orquestrador de produção abrangente | 73,231 | 114 | 303 | 153 | 157 | 0 | N/A | 2.73 | 2.73 | 0.5712 | B |
| [diffusionstudio/editor](https://github.com/diffusionstudio/editor) | editor desktop baseado em código | 3,436 | 20 | 22 | 46 | 9 | 29 | 0.69 | 0.91 | 0.80 | 0.2556 | A + B |
| [FireRedTeam/FireRed-OpenStoryline](https://github.com/FireRedTeam/FireRed-OpenStoryline) | orquestrador de edição conversacional | 3,596 | 22 | 11 | 46 | 14 | 0 | N/A | 0.72 | 0.72 | 0.2349 | B |
| [hypit-ai/hypit](https://github.com/hypit-ai/hypit) | Compilador de fluxos de vídeo | 26,790 | 24 | 53 | 260 | 35 | 27 | 0.89 | 0.30 | 0.59 | 0.2021 | A + B |
| [palmier-io/palmier-pro](https://github.com/palmier-io/palmier-pro) | editor desktop / código-fonte histórico | 14,662 | 66 | 34 | 360 | 78 | 89 | 0.74 | 0.28 | 0.51 | 0.1789 | A + B |
| [VelornLabs/velorn](https://github.com/VelornLabs/velorn) | editor desktop / estação de geração | 518 | 21 | 5 | 44 | 8 | 64 | 0.33 | 0.59 | 0.46 | 0.1642 | A + B |
| [openfilm/openfilm](https://github.com/openfilm/openfilm) | Sistema de edição/composição | 3,721 | 10 | 4 | 207 | 27 | 13 | 0.77 | 0.07 | 0.42 | 0.1518 | A + B |
| [0xsline/OpenChatCut](https://github.com/0xsline/OpenChatCut) | editor local de linha do tempo conversacional | 2,796 | 14 | 11 | 78 | 29 | 28 | 0.50 | 0.32 | 0.41 | 0.1493 | A + B |
| [hetpatel-11/Adobe_Premiere_Pro_MCP](https://github.com/hetpatel-11/Adobe_Premiere_Pro_MCP) | Integração com Premiere Pro | 783 | 0 | 21 | 41 | 9 | 20 | 0.00 | 0.51 | 0.26 | 0.0990 | A + B |
| [ronak-create/FableCut](https://github.com/ronak-create/FableCut) | Editor no navegador | 771 | 7 | 1 | 130 | 2 | 18 | 0.39 | 0.06 | 0.23 | 0.0882 | A + B |
| [AKMessi/vex](https://github.com/AKMessi/vex) | Agente de edição no terminal | 96 | 3 | 2 | 50 | 4 | 16 | 0.19 | 0.10 | 0.14 | 0.0583 | A + B |
| [Mvp2o-ai/cuttingfloor](https://github.com/Mvp2o-ai/cuttingfloor) | Motor de edição headless | 0 | 0 | 12 | 44 | 7 | 35 | 0.00 | 0.27 | 0.14 | 0.0555 | A + B |
| [MartinDelophy/ai-video-editor](https://github.com/MartinDelophy/ai-video-editor) | Editor local e skill | 924 | 5 | 0 | 82 | 0 | 31 | 0.16 | 0.06 | 0.11 | 0.0458 | A + B |
| [KyaniteLabs/kinocut](https://github.com/KyaniteLabs/kinocut) | kit de edição headless | 232 | 7 | 4 | 440 | 60 | 52 | 0.13 | 0.03 | 0.08 | 0.0333 | A + B |
| [samuelgursky/davinci-resolve-mcp](https://github.com/samuelgursky/davinci-resolve-mcp) | Integração com DaVinci Resolve | 3,855 | 4 | 3 | 161 | 44 | 486 | 0.01 | 0.04 | 0.03 | 0.0111 | A + B |
| [dziksu/synkinema](https://github.com/dziksu/synkinema) | Editor local e motor headless | 18 | 0 | 4 | 78 | 34 | 21 | 0.00 | 0.05 | 0.03 | 0.0110 | A + B |
| [mattppal/mcut](https://github.com/mattppal/mcut) | SDK de edição e estúdio desktop | 7 | 0 | 10 | 201 | 12 | 206 | 0.00 | 0.05 | 0.02 | 0.0107 | A + B |
| [OrellBuehler/kerf](https://github.com/OrellBuehler/kerf) | Editor desktop | 10 | 0 | 6 | 227 | 19 | 37 | 0.00 | 0.03 | 0.01 | 0.0057 | A + B |
| [naman-sharma12345/kimo](https://github.com/naman-sharma12345/kimo) | Motor de edição headless | 20 | 0 | 0 | 38 | 2 | 5 | 0.00 | 0.00 | 0.00 | 0.0000 | A + B |

## O gráfico das razões

O gráfico usa as mesmas pontuações da tabela. Na tabela você consulta os valores exatos; nas barras, a dispersão fica mais fácil de ver. Em telas estreitas, o gráfico aparece na vertical para facilitar a leitura. Você também pode [abrir o gráfico em tamanho real](/images/blog/agentic-video-benchmark.svg).

![Slop Log Scores de 21 repositórios de vídeo com IA agêntica, 30 de outubro de 2026](/images/blog/agentic-video-benchmark.svg)

## Estrelas vs. slop

As estrelas medem o hype, e o Slop Log Score mede a pressão do backlog. Com os dois no mesmo gráfico, dá para ver quais projetos são populares e ainda mantêm o backlog sob controle. A linha pontilhada de Pareto liga os repositórios que nenhum outro repositório supera nos dois critérios. A área verde marca estrelas acima da mediana com slop abaixo da mediana, e a área âmbar marca estrelas acima da média com slop abaixo da média; onde as duas se sobrepõem, o repositório passa nos dois critérios. As estrelas ficam no eixo vertical, em escala logarítmica (estrelas + 1), e continuam servindo de contexto, sem entrar no cálculo da pontuação.

![Estrelas versus Slop Log Score de 21 repositórios de vídeo com IA agêntica, com linha de Pareto pontilhada, 30 de outubro de 2026](/images/blog/agentic-video-pareto.svg)

## Análise das issues de cada projeto

A pontuação é um sinal de triagem, não um veredito sobre mantenedores ou usuários. As discussões indicadas abaixo refletem a amostra selecionada e não estabelecem a prevalência nem a situação atual dos problemas relatados.

<a id="mbehtemam-montagent-0-7159-log-score"></a>

## MBehtemam/Montagent: Slop Log Score de 0.7159

Aqui, o repositório está na categoria motor de edição headless. Projetos em JSON, CLI e ferramentas MCP cobrem inspeção de frames, prévia, renderização, medição, validação e verificação. A LICENSE real é MIT, apesar dos metadados NOASSERTION do GitHub; as licenças das mídias são separadas. Requer FFmpeg com libx264. O MCP remoto hospedado foi projetado, mas não lançado.

As threads selecionadas são inventários de planejamento de recursos e uma especificação histórica, não relatos individuais de bugs. Recuperamos os grandes apêndices, mas não validamos de forma independente as linhas individuais de recursos.

Discussões selecionadas: [thread guarda-chuva](https://github.com/MBehtemam/Montagent/issues/956); [thread guarda-chuva](https://github.com/MBehtemam/Montagent/issues/954); [thread guarda-chuva](https://github.com/MBehtemam/Montagent/issues/2). Essas classificações descrevem a thread, não um defeito verificado nem uma resolução atual.

<a id="video-db-director-0-7065-log-score"></a>

## video-db/Director: Slop Log Score de 0.7065

Aqui, o repositório está na categoria Orquestrador de produção em nuvem. Busca de vídeo multiagente, destaques, recortes, sobreposições, dublagem/legendas e compilações. Depende da infraestrutura/configuração de API do VideoDB; não é um NLE desktop autossuficiente.

As threads da amostra pedem suporte a um provedor ou uma recomendação de provedor. Um pull request vinculado não prova que o suporte foi lançado.

Discussões selecionadas: [thread de recurso](https://github.com/video-db/Director/issues/194); [thread de recurso/recomendação de provedor](https://github.com/video-db/Director/issues/186).

<a id="calesthio-openmontage-0-3734-log-score"></a>

<a id="calesthio-openmontage-0-5712-log-score"></a>

## calesthio/OpenMontage: Slop Log Score de 0.5712

Aqui, o repositório está na categoria Orquestrador de produção abrangente. Sistema agêntico que abrange pesquisa, roteiros, assets, edição e composição. Seu README documenta clipes de vídeo reais colocados em uma linha do tempo e renderizados, junto com assets gerados. Inclui aprovação de storyboard e revisão local. Vai além de um NLE, com custos e autenticação de provedores específicos de cada pipeline.

A issue selecionada com mais comentários hospeda anexos de trailers; outra recruta revisores. A thread de integração com o Hermes traz relatos divergentes, incluindo um preflight bem-sucedido e uma preocupação posterior com o fluxo de trabalho, sem resolução final de um mantenedor.

Discussões selecionadas: [thread administrativa/de upload de mídia](https://github.com/calesthio/OpenMontage/issues/1); [thread da comunidade/recrutamento de revisores](https://github.com/calesthio/OpenMontage/issues/149); [thread de suporte/integração](https://github.com/calesthio/OpenMontage/issues/165).

<a id="diffusionstudio-editor-0-2556-log-score"></a>

## diffusionstudio/editor: Slop Log Score de 0.2556

Aqui, o repositório está na categoria editor desktop baseado em código. Pessoas e agentes editam gravações reais pelo mesmo documento baseado em código, com inspeção, verificação, renderização e suporte headless via MCP/CLI. MPL-2.0. Os downloads atuais para desktop atendem macOS em Apple Silicon e Windows x64. É diferente do framework mais antigo diffusionstudio/agent.

Um colaborador relata que os defeitos originais do build para Windows e do handshake foram corrigidos na main e na v0.206.0; o autor do relato pretendia testar de novo, e a inicialização automática a partir de um checkout do código-fonte continuava sendo uma limitação. Outras threads pedem suporte a Linux e a navegador; uma implementação parcial vinculada não comprova um recurso lançado.

Discussões selecionadas: [thread de bug](https://github.com/diffusionstudio/editor/issues/82); [thread de recurso](https://github.com/diffusionstudio/editor/issues/40); [thread de recurso](https://github.com/diffusionstudio/editor/issues/52).

<a id="fireredteam-firered-openstoryline-0-1331-log-score"></a>

<a id="fireredteam-firered-openstoryline-0-2349-log-score"></a>

## FireRedTeam/FireRed-OpenStoryline: Slop Log Score de 0.2349

Aqui, o repositório está na categoria orquestrador de edição conversacional. Busca e segmentação de mídia, planejamento da história, narração/música e operações conversacionais de cortar, trocar e reordenar, além de skills reutilizáveis de estilo e de corte bruto de falas. Apache-2.0 e baseado em Python. As transições opcionais com IA usam serviços de terceiros, com incerteza documentada sobre custo e resultado. Não apresente itens de TODO como recursos lançados.

Duas threads de suporte descrevem erros na inicialização de conversas e a investigação da conectividade de proxy ou MCP. Um usuário relata uma solução alternativa, enquanto outros continuam com falhas; o pedido de provedor selecionado não comprova uma integração lançada.

Discussões selecionadas: [thread de suporte](https://github.com/FireRedTeam/FireRed-OpenStoryline/issues/30); [thread de suporte](https://github.com/FireRedTeam/FireRed-OpenStoryline/issues/76); [thread de recurso](https://github.com/FireRedTeam/FireRed-OpenStoryline/issues/104).

<a id="hypit-ai-hypit-0-2021-log-score"></a>

## hypit-ai/hypit: Slop Log Score de 0.2021

Aqui, o repositório está na categoria Compilador de fluxos de vídeo. Uma linguagem legível por agentes ancora gravações/legendas/B-roll/efeitos às palavras faladas e oferece suporte a variantes e gráficos renderizados por código. A licença restringe SaaS multi-tenant, redistribuição e uso da marca; permite expressamente o trabalho para a própria organização ou para clientes.

Uma thread pergunta sobre edição estrita do vídeo de origem e sobre cobrança, sem que a pessoa tivesse enviado uma geração. Um relato sobre renderização de legendas aguarda um novo teste solicitado; outro usuário relata ter esgotado a cota de tokens antes da renderização, e a causa continuou sem solução.

Discussões selecionadas: [thread de suporte/esclarecimento de capacidade](https://github.com/hypit-ai/hypit/issues/432); [thread de bug/renderização aguardando novo teste](https://github.com/hypit-ai/hypit/issues/330); [thread de suporte/custo](https://github.com/hypit-ai/hypit/issues/270).

<a id="palmier-io-palmier-pro-0-1789-log-score"></a>

## palmier-io/palmier-pro: Slop Log Score de 0.1789

Aqui, o repositório está na categoria editor desktop / código-fonte histórico. Linha do tempo nativa em Swift para macOS com MCP local, para que agentes de programação editem o mesmo projeto; a geração é opcional. O código-fonte e as releases sob GPL vão apenas até v0.7.6 e last-gpl-source. Os binários posteriores são proprietários e seu código-fonte não foi publicado; o projeto não aceita novas contribuições de código. macOS 26+ em Apple Silicon.

Um usuário relatou um travamento na exportação em 4K/60, e um colaborador pediu uma reprodução; não houve confirmação definitiva de correção. Outra thread relata congelamentos, com melhorias parciais discutidas, e uma terceira pede suporte a versões mais antigas do macOS e a Intel.

Discussões selecionadas: [thread de bug](https://github.com/palmier-io/palmier-pro/issues/68); [thread de bug](https://github.com/palmier-io/palmier-pro/issues/58); [thread de recurso](https://github.com/palmier-io/palmier-pro/issues/14).

<a id="velornlabs-velorn-0-1642-log-score"></a>

## VelornLabs/velorn: Slop Log Score de 0.1642

Aqui, o repositório está na categoria editor desktop / estação de geração. Edição multitrilha, legendas, efeitos e exportações, com inspeção de frames via MCP local, edições com prévia antes da aplicação e desfazer; os fluxos de geração usam ComfyUI. GPL-3.0. Edição, exportação e MCP não exigem ComfyUI, mas a geração atual exige. Nem todas as operações de sistema de arquivos e de importação/exportação podem ser desfeitas.

Um usuário confirmou que o problema original de keyframe sem referência foi corrigido na v0.3.8. Um fluxo separado com imagem opcional continua como pendência; outras threads pedem preenchimento de lacunas e facilidades de edição, sem comprovar que todos os recursos pedidos foram lançados.

Discussões selecionadas: [thread de bug](https://github.com/VelornLabs/velorn/issues/77); [thread de recurso](https://github.com/VelornLabs/velorn/issues/57); [thread de recurso](https://github.com/VelornLabs/velorn/issues/55).

<a id="openfilm-openfilm-0-1518-log-score"></a>

## openfilm/openfilm: Slop Log Score de 0.1518

Aqui, o repositório está na categoria Sistema de edição/composição. Agentes de programação editam film.html; o Studio oferece edição de linha do tempo e de elementos para gravações, áudio e gráficos programáveis. Node 22.2+, FFmpeg e Chromium são pré-requisitos documentados. É uma boa referência de composição orientada por código, mas não o testamos na prática nesta auditoria.

Um relato diz que o Studio fecha um projeto quando film.html desaparece temporariamente durante a edição de um agente; um mantenedor reconheceu a preocupação com a recuperação, mas não verificamos se a correção posterior foi lançada. Um relato de incompatibilidade de versões continuava em investigação, e outra thread trata de pedidos de usabilidade.

Discussões selecionadas: [thread de bug](https://github.com/openfilm/openfilm/issues/304); [thread de relato de integração](https://github.com/openfilm/openfilm/issues/290); [thread de melhoria/usabilidade](https://github.com/openfilm/openfilm/issues/230).

<a id="0xsline-openchatcut-0-1493-log-score"></a>

## 0xsline/OpenChatCut: Slop Log Score de 0.1493

Aqui, o repositório está na categoria editor local de linha do tempo conversacional. O MCP externo e os agentes integrados compartilham um projeto multitrilha editável, com cortes pela transcrição, legendas, efeitos, keyframes e renderização com Remotion. AGPL-3.0-or-later. Não confunda a oferta desktop Pro, que é separada, com a edição de código público. Os comandos de teste, lint e build estão documentados.

Um usuário confirmou depois que o Whisper funciona após correções discutidas na thread, mas levantou outras reclamações sobre o agente, as legendas e a prévia, que continuam sem confirmação. Outro pedido trata de modelos maiores; o dono do projeto diz que um modelo foi lançado e que outro backend continua sem suporte.

Discussões selecionadas: [thread de bug](https://github.com/0xsline/OpenChatCut/issues/120); [thread de recurso](https://github.com/0xsline/OpenChatCut/issues/155); [thread de recurso](https://github.com/0xsline/OpenChatCut/issues/127).

<a id="hetpatel-11-adobe-premiere-pro-mcp-0-0990-log-score"></a>

## hetpatel-11/Adobe_Premiere_Pro_MCP: Slop Log Score de 0.0990

Aqui, o repositório está na categoria Integração com Premiere Pro. Um MCP local se conecta a um painel CEP e ao ExtendScript para operações na linha do tempo, keyframes/ducking de áudio e exportação pelo Media Encoder. MIT. Requer o Premiere e o Node instalados. O CEP é suportado; o UXP é experimental. As alterações que o instalador faz nas configurações de debug/cliente exigem revisão cuidadosa, não execução automática.

Nenhuma issue aberta recente atendeu aos critérios de seleção. Isso não comprova que o software esteja livre de bugs.

<a id="ronak-create-fablecut-0-0882-log-score"></a>

## ronak-create/FableCut: Slop Log Score de 0.0882

Aqui, o repositório está na categoria Editor no navegador. Editor no navegador com linha do tempo em JSON, REST/MCP, clipes, efeitos, transições e keyframes. Há scripts de teste em Node. Controle pelo agente não é o mesmo que visão do agente: a inspeção de frames/folha de contato continua como um pedido de recurso em aberto.

As discussões selecionadas tratam de uma integração proposta com o Rive, da política de runtime do Node e de CI e de ferramentas de inspeção de frames. A demo de um colaborador não prova que uma integração foi lançada.

Discussões selecionadas: [thread de recurso](https://github.com/ronak-create/FableCut/issues/62); [thread de manutenção](https://github.com/ronak-create/FableCut/issues/64); [thread de recurso](https://github.com/ronak-create/FableCut/issues/5).

<a id="akmessi-vex-0-0583-log-score"></a>

## AKMessi/vex: Slop Log Score de 0.0583

Aqui, o repositório está na categoria Agente de edição no terminal. Loop de ferramentas com LLM para cópia de gravações, trim/merge/áudio/legendas e histórico da linha do tempo; backends opcionais de geração visual. O README exclui fluxos internos de negócios/receita sem licenciamento comercial separado.

Uma thread contém uma montagem solicitada, e outra pede exemplos de saída. Nenhuma delas prova que os recursos pedidos funcionam ou falham.

Discussões selecionadas: [thread de suporte/pedido de tarefa](https://github.com/AKMessi/vex/issues/52); [thread de documentação/recurso](https://github.com/AKMessi/vex/issues/17).

<a id="mvp2o-ai-cuttingfloor-0-0555-log-score"></a>

## Mvp2o-ai/cuttingfloor: Slop Log Score de 0.0555

Aqui, o repositório está na categoria Motor de edição headless. Editor MCP para importar gravações, operações granulares na linha do tempo, prévias e exportações; cada edição retorna um ID imutável de linha do tempo. O Docker empacota FFmpeg/MLT. Os tempos de vida documentados de 24 horas para linhas do tempo e de sete dias para o cache de mídia/exportação importam em fluxos sem supervisão. Licença verificada em develop/LICENSE.

Nenhuma issue aberta recente atendeu aos critérios de seleção. Isso não comprova que o software esteja livre de bugs.

<a id="martindelophy-ai-video-editor-0-0458-log-score"></a>

## MartinDelophy/ai-video-editor: Slop Log Score de 0.0458

Aqui, o repositório está na categoria Editor local e skill. Linha do tempo compartilhada e skill do Codex para análise e planos de cenas/transcrições, com exportação editável para o Jianying e relatórios de compatibilidade. O app misto também contém recursos de avatar; requisitos opcionais de host/runtime no macOS.

As discussões da amostra sugerem otimização de modelos, pedem a tradução do guia de contribuição e acompanham um spike de pesquisa sobre humanos digitais. Elas não são evidência de que as mudanças propostas foram concluídas.

Discussões selecionadas: [thread de recurso/sugestão de otimização](https://github.com/MartinDelophy/ai-video-editor/issues/119); [thread de documentação](https://github.com/MartinDelophy/ai-video-editor/issues/55); [thread guarda-chuva/pesquisa](https://github.com/MartinDelophy/ai-video-editor/issues/54).

<a id="kyanitelabs-kinocut-0-0333-log-score"></a>

## KyaniteLabs/kinocut: Slop Log Score de 0.0333

Aqui, o repositório está na categoria kit de edição headless. Ferramentas FFmpeg tipadas via MCP, Python e CLI para cortes, legendas e reaproveitamento de conteúdo, com recibos de proveniência, preflight e verificações de release. Apache-2.0. Requer Python e FFmpeg; HyperFrames/Whisper são opcionais. É a renomeação canônica do mcp-video, não um produto independente adicional.

A thread de espelhamento selecionada trata de uma barreira da política de sincronização, não de renderização. Uma thread guarda-chuva separada acompanha barreiras de verificação e correções ainda não lançadas; segundo um membro, uma proposta de descoberta de ferramentas não está no roadmap atual.

Discussões selecionadas: [thread de suporte](https://github.com/KyaniteLabs/kinocut/issues/488); [thread guarda-chuva](https://github.com/KyaniteLabs/kinocut/issues/476); [thread de recurso](https://github.com/KyaniteLabs/kinocut/issues/591).

<a id="samuelgursky-davinci-resolve-mcp-0-0111-log-score"></a>

## samuelgursky/davinci-resolve-mcp: Slop Log Score de 0.0111

Aqui, o repositório está na categoria Integração com DaVinci Resolve. Ponte MCP para as APIs de scripting do Resolve, voltada a organização de linha do tempo/mídia, renderização, marcadores de revisão, correção de cor, Fusion e Fairlight. MIT. A compatibilidade depende da edição e da versão: a documentação atual descreve uma ponte para a edição Free, mas avisa que o Free 21.1 removeu o Python do menu Scripts. Evite afirmações genéricas sobre Free/Studio.

Um autor de relato confirmou uma proteção contra um problema anterior na aplicação da linha do tempo; o dono do projeto disse que a geração posterior de linhas do tempo ainda aguardava confirmação em uso real. As outras threads selecionadas tratam da atribuição de um CVE para um aviso de segurança já corrigido e de um relato sobre CPU sem causa atribuída.

Discussões selecionadas: [thread de bug](https://github.com/samuelgursky/davinci-resolve-mcp/issues/318); [thread de suporte](https://github.com/samuelgursky/davinci-resolve-mcp/issues/316); [thread de suporte](https://github.com/samuelgursky/davinci-resolve-mcp/issues/290).

<a id="dziksu-synkinema-0-0110-log-score"></a>

## dziksu/synkinema: Slop Log Score de 0.0110

Aqui, o repositório está na categoria Editor local e motor headless. O Studio e as interfaces REST/MCP/CLI compartilham o histórico do projeto. Um gateway local conecta os agentes de programação instalados, e um backend em contêiner faz a renderização. O suporte a Docker, por si só, não comprova uma implantação funcional no Coolify; os pré-requisitos de launcher e de autenticação continuam valendo.

Nenhuma issue aberta recente atendeu aos critérios de seleção. Isso não comprova que o software esteja livre de bugs.

<a id="mattppal-mcut-0-0107-log-score"></a>

## mattppal/mcut: Slop Log Score de 0.0107

Aqui, o repositório está na categoria SDK de edição e estúdio desktop. Motor de linha do tempo headless em TypeScript, com comandos serializáveis, desfazer/refazer, renderização, adaptadores de transcrição, CLI/MCP e Electron Studio. Apache-2.0. Pacotes alfa e APIs instáveis. A documentação atual no GitHub diz que o Studio é distribuído para macOS/Linux; a alegação antiga da lista de espera em mcut.io está desatualizada.

Nenhuma issue aberta recente atendeu aos critérios de seleção. Isso não comprova que o software esteja livre de bugs.

<a id="orellbuehler-kerf-0-0057-log-score"></a>

## OrellBuehler/kerf: Slop Log Score de 0.0057

Aqui, o repositório está na categoria Editor desktop. Editor em Rust/Tauri com MCP, ferramentas de frames/folha de contato, prévias da linha do tempo e propostas de agentes em etapas para revisão humana. Código disponível sob licença não comercial, não open source sem restrições. Os metadados do GitHub dizem NOASSERTION, mas o LICENSE.md real identifica a licença.

Nenhuma issue aberta recente atendeu aos critérios de seleção. Isso não comprova que o software esteja livre de bugs.

<a id="naman-sharma12345-kimo-0-0000-log-score"></a>

## naman-sharma12345/kimo: Slop Log Score de 0.0000

Aqui, o repositório está na categoria Motor de edição headless. Motor em Rust/C++ exposto via MCP e CLI para cortes, correção de cor, keyframes e exportação. O spectator é somente leitura, não uma interface gráfica de edição. Requer FFmpeg. O Linux tem o caminho testado mais claro; o CI no Windows não é validação em hardware, e a documentação descreve o macOS como não testado.

Nenhuma issue aberta recente atendeu aos critérios de seleção. Isso não comprova que o software esteja livre de bugs.

## O que o Slop Benchmark mostra no geral

Todos os 21 repositórios mostrados têm pontuação calculável. Projetos sem releases são pontuados apenas com B, então suas pontuações não são diretamente comparáveis a uma média das duas medidas. As contagens de releases também refletem práticas de publicação diferentes: o mcut inclui 195 pré-lançamentos em 206 registros, enquanto o repositório do Resolve MCP tem 486 releases publicadas.

Licenças e limites de cada produto também pesam, além dos números. Kerf e Vex usam PolyForm Noncommercial; o Hypit usa uma licença Apache modificada com restrições. O código-fonte público sob GPL do Palmier termina em v0.7.6/last-gpl-source, e os binários posteriores são proprietários. Antes de adotar qualquer um deles, revise as licenças atuais, as dependências e as threads de issues específicas que se cruzam com o seu fluxo de trabalho.
