---
title: "Slop Benchmark: comparação de 38 repositórios de vídeo com IA agêntica"
meta_title: "Slop Benchmark: 38 repositórios de vídeo com IA agêntica"
meta_description: "Comparamos backlog e atividade no GitHub de 38 repositórios de vídeo com IA agêntica, com gráfico e análise de threads de issues selecionadas."
published: "2026-10-30"
updated: "2026-10-30"
---

Um projeto pode ter milhões de estrelas e ainda assim fazer você passar a tarde depurando. O Slop Benchmark compara de forma direta o backlog público visível com a atividade de releases e de pull requests mesclados. Não é uma nota de qualidade de código, uma auditoria de segurança nem uma previsão de que um projeto vai fracassar. Funciona como um medidor rápido de pressão. Depois, analisamos issues abertas selecionadas para entender o que as discussões representam.

## O que a razão pode e não pode dizer

Os 38 repositórios independentes incluem editores, motores headless, pontes para editores comerciais, skills de agentes e frameworks de pesquisa ou produção. Eles não são editores de vídeo completos e intercambiáveis. Não instalamos nem executamos nenhum repositório para esta comparação; os recursos descritos abaixo são alegações da documentação, não comportamento testado.

Coletamos o snapshot das pontuações em 30 de outubro de 2026, 15:32:03–15:35:40 UTC, com rótulos de lote 15:34 e 15:36 UTC. A coleta é sequencial, não atômica. As issues abertas excluem PRs. Os registros de releases publicadas no GitHub incluem pré-lançamentos e excluem rascunhos. Os PRs abertos incluem rascunhos; os PRs fechados sem mesclagem aparecem em uma coluna separada e ficam fora do denominador de B.

> **A = issues abertas ÷ releases publicadas**
>
> **B = (issues abertas + PRs abertos) ÷ total de PRs mesclados desde a criação**
>
> **C = (A + B) ÷ 2; Slop Log Score = log10(1 + C)**

Se não houver releases, mas B existir, C = B/2. Essa regra reduz B pela metade de propósito; ela não significa que o A ausente seja zero. Se B estiver indefinido porque nenhum PR foi mesclado, o Slop Log Score é N/A, mesmo que A exista. N/A não é zero. Os cálculos usam razões sem arredondamento; os componentes aparecem com duas casas decimais e o Slop Log Score com quatro. Um valor menor indica menos backlog público em relação a esses denominadores, não prova de edição confiável. Práticas de release, tipos de issue e idade do projeto afetam a pontuação.

Para a verificação qualitativa, selecionamos até três issues atualmente abertas, atualizadas desde 30 de abril, por repositório. Excluímos PRs e ordenamos por número de comentários e depois pelo número da issue, em ordem decrescente. Analisamos o corpo das issues e os comentários disponíveis em 30 de outubro. Nas issues do video-use, os contadores superavam os comentários retornados pelo endpoint, por motivos desconhecidos, então esta análise não afirma cobertura completa do histórico de comentários. As threads abertas incluem suporte, propostas e ruído administrativo, além de relatos de problemas; a ausência de uma thread qualificada não significa software sem bugs.

## A tabela comparativa

A coluna Base separa os casos com as duas medidas disponíveis do fallback para projetos sem releases. As estrelas servem de contexto e não entram no cálculo da pontuação.

| Projeto | Categoria | Estrelas no GitHub | Issues abertas | PRs abertos | PRs mesclados | Fechados sem mesclar | Releases | A | B | C | Slop Log Score | Base |
|:--|:--|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|:--|
| [HKUDS/VideoAgent](https://github.com/HKUDS/VideoAgent) | Sistema de pesquisa | 1,981 | 12 | 2 | 1 | 1 | 0 | N/A | 14.00 | 7.00 | 0.9031 | B/2 |
| [browser-use/video-use](https://github.com/browser-use/video-use) | skill de edição de gravações | 30,139 | 35 | 127 | 14 | 25 | 0 | N/A | 11.57 | 5.79 | 0.8316 | B/2 |
| [MBehtemam/Montagent](https://github.com/MBehtemam/Montagent) | motor de edição headless | 3 | 74 | 0 | 421 | 6 | 9 | 8.22 | 0.18 | 4.20 | 0.7159 | A + B |
| [video-db/Director](https://github.com/video-db/Director) | Orquestrador de produção em nuvem | 1,568 | 8 | 13 | 120 | 27 | 1 | 8.00 | 0.18 | 4.09 | 0.7065 | A + B |
| [GVCLab/CutClaw](https://github.com/GVCLab/CutClaw) | Sistema de pesquisa | 993 | 4 | 0 | 1 | 0 | 0 | N/A | 4.00 | 2.00 | 0.4771 | B/2 |
| [Dakkshin/after-effects-mcp](https://github.com/Dakkshin/after-effects-mcp) | Integração de composição com After Effects | 822 | 9 | 17 | 7 | 8 | 0 | N/A | 3.71 | 1.86 | 0.4559 | B/2 |
| [UniVA-Verse/UniVA](https://github.com/UniVA-Verse/UniVA) | generalista de pesquisa | 539 | 3 | 0 | 1 | 0 | 0 | N/A | 3.00 | 1.50 | 0.3979 | B/2 |
| [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) | Orquestrador de produção abrangente | 73,231 | 114 | 303 | 153 | 157 | 0 | N/A | 2.73 | 1.36 | 0.3734 | B/2 |
| [veedstudio/open-edit](https://github.com/veedstudio/open-edit) | pipeline de edição orientado por código | 1,754 | 2 | 1 | 23 | 1 | 1 | 2.00 | 0.13 | 1.07 | 0.3150 | A + B |
| [Aepzie/cutline](https://github.com/Aepzie/cutline) | Editor no navegador | 1 | 5 | 6 | 22 | 4 | 4 | 1.25 | 0.50 | 0.88 | 0.2730 | A + B |
| [diffusionstudio/editor](https://github.com/diffusionstudio/editor) | editor desktop baseado em código | 3,436 | 20 | 22 | 46 | 9 | 29 | 0.69 | 0.91 | 0.80 | 0.2556 | A + B |
| [WeftCut/WeftCut](https://github.com/WeftCut/WeftCut) | Editor desktop | 293 | 14 | 0 | 17 | 26 | 25 | 0.56 | 0.82 | 0.69 | 0.2283 | A + B |
| [hypit-ai/hypit](https://github.com/hypit-ai/hypit) | Compilador de fluxos de vídeo | 26,790 | 24 | 53 | 260 | 35 | 27 | 0.89 | 0.30 | 0.59 | 0.2021 | A + B |
| [palmier-io/palmier-pro](https://github.com/palmier-io/palmier-pro) | editor desktop / código-fonte histórico | 14,662 | 66 | 34 | 360 | 78 | 89 | 0.74 | 0.28 | 0.51 | 0.1789 | A + B |
| [VelornLabs/velorn](https://github.com/VelornLabs/velorn) | editor desktop / estação de geração | 518 | 21 | 5 | 44 | 8 | 64 | 0.33 | 0.59 | 0.46 | 0.1642 | A + B |
| [openfilm/openfilm](https://github.com/openfilm/openfilm) | Sistema de edição/composição | 3,721 | 10 | 4 | 207 | 27 | 13 | 0.77 | 0.07 | 0.42 | 0.1518 | A + B |
| [0xsline/OpenChatCut](https://github.com/0xsline/OpenChatCut) | editor local de linha do tempo conversacional | 2,796 | 14 | 11 | 78 | 29 | 28 | 0.50 | 0.32 | 0.41 | 0.1493 | A + B |
| [FireRedTeam/FireRed-OpenStoryline](https://github.com/FireRedTeam/FireRed-OpenStoryline) | orquestrador de edição conversacional | 3,596 | 22 | 11 | 46 | 14 | 0 | N/A | 0.72 | 0.36 | 0.1331 | B/2 |
| [BeatAPI/BeatDesign](https://github.com/BeatAPI/BeatDesign) | editor local de canvas e linha do tempo | 279 | 2 | 1 | 25 | 0 | 5 | 0.40 | 0.12 | 0.26 | 0.1004 | A + B |
| [hetpatel-11/Adobe_Premiere_Pro_MCP](https://github.com/hetpatel-11/Adobe_Premiere_Pro_MCP) | Integração com Premiere Pro | 783 | 0 | 21 | 41 | 9 | 20 | 0.00 | 0.51 | 0.26 | 0.0990 | A + B |
| [ronak-create/FableCut](https://github.com/ronak-create/FableCut) | Editor no navegador | 771 | 7 | 1 | 130 | 2 | 18 | 0.39 | 0.06 | 0.23 | 0.0882 | A + B |
| [pireel/pireel](https://github.com/pireel/pireel) | editor de linha do tempo no navegador | 1,332 | 2 | 0 | 5 | 1 | 0 | N/A | 0.40 | 0.20 | 0.0792 | B/2 |
| [mhadifilms/dvr](https://github.com/mhadifilms/dvr) | Integração com DaVinci Resolve | 15 | 2 | 0 | 7 | 1 | 23 | 0.09 | 0.29 | 0.19 | 0.0742 | A + B |
| [deonmenezes/edit-ai](https://github.com/deonmenezes/edit-ai) | Editor e harness de agentes | 2 | 3 | 2 | 16 | 1 | 0 | N/A | 0.31 | 0.16 | 0.0631 | B/2 |
| [AKMessi/vex](https://github.com/AKMessi/vex) | Agente de edição no terminal | 96 | 3 | 2 | 50 | 4 | 16 | 0.19 | 0.10 | 0.14 | 0.0583 | A + B |
| [Mvp2o-ai/cuttingfloor](https://github.com/Mvp2o-ai/cuttingfloor) | Motor de edição headless | 0 | 0 | 12 | 44 | 7 | 35 | 0.00 | 0.27 | 0.14 | 0.0555 | A + B |
| [MartinDelophy/ai-video-editor](https://github.com/MartinDelophy/ai-video-editor) | Editor local e skill | 924 | 5 | 0 | 82 | 0 | 31 | 0.16 | 0.06 | 0.11 | 0.0458 | A + B |
| [KyaniteLabs/kinocut](https://github.com/KyaniteLabs/kinocut) | kit de edição headless | 232 | 7 | 4 | 440 | 60 | 52 | 0.13 | 0.03 | 0.08 | 0.0333 | A + B |
| [diffusionstudio/agent](https://github.com/diffusionstudio/agent) | agente antigo de composição por código | 297 | 1 | 0 | 17 | 0 | 0 | N/A | 0.06 | 0.03 | 0.0126 | B/2 |
| [samuelgursky/davinci-resolve-mcp](https://github.com/samuelgursky/davinci-resolve-mcp) | Integração com DaVinci Resolve | 3,855 | 4 | 3 | 161 | 44 | 486 | 0.01 | 0.04 | 0.03 | 0.0111 | A + B |
| [dziksu/synkinema](https://github.com/dziksu/synkinema) | Editor local e motor headless | 18 | 0 | 4 | 78 | 34 | 21 | 0.00 | 0.05 | 0.03 | 0.0110 | A + B |
| [mattppal/mcut](https://github.com/mattppal/mcut) | SDK de edição e estúdio desktop | 7 | 0 | 10 | 201 | 12 | 206 | 0.00 | 0.05 | 0.02 | 0.0107 | A + B |
| [OrellBuehler/kerf](https://github.com/OrellBuehler/kerf) | Editor desktop | 10 | 0 | 6 | 227 | 19 | 37 | 0.00 | 0.03 | 0.01 | 0.0057 | A + B |
| [CanadaApollo6/Kinewright](https://github.com/CanadaApollo6/Kinewright) | Editor nativo | 8 | 0 | 0 | 17 | 0 | 0 | N/A | 0.00 | 0.00 | 0.0000 | B/2 |
| [DareDev256/fcp-mcp-server](https://github.com/DareDev256/fcp-mcp-server) | Integração com XML do Final Cut Pro | 130 | 0 | 0 | 14 | 0 | 43 | 0.00 | 0.00 | 0.00 | 0.0000 | A + B |
| [matrodrigs/shotcut-mcp](https://github.com/matrodrigs/shotcut-mcp) | Integração com Shotcut | 24 | 0 | 0 | 6 | 0 | 17 | 0.00 | 0.00 | 0.00 | 0.0000 | A + B |
| [naman-sharma12345/kimo](https://github.com/naman-sharma12345/kimo) | Motor de edição headless | 20 | 0 | 0 | 38 | 2 | 5 | 0.00 | 0.00 | 0.00 | 0.0000 | A + B |
| [Remocn/remocn-studio](https://github.com/Remocn/remocn-studio) | Composição por código dirigida por agentes | 209 | 0 | 0 | 23 | 0 | 4 | 0.00 | 0.00 | 0.00 | 0.0000 | A + B |

## O gráfico das razões

O gráfico usa as mesmas pontuações da tabela. Na tabela você consulta os valores exatos; nas barras, a dispersão fica mais fácil de ver. Em telas estreitas, o gráfico aparece na vertical para facilitar a leitura. Você também pode [abrir o gráfico em tamanho real](/images/blog/agentic-video-benchmark.svg).

![Slop Log Scores de 38 repositórios de vídeo com IA agêntica, 30 de outubro de 2026](/images/blog/agentic-video-benchmark.svg)

## Análise das issues de cada projeto

A pontuação é um sinal de triagem, não um veredito sobre mantenedores ou usuários. As discussões indicadas abaixo refletem a amostra selecionada e não estabelecem a prevalência nem a situação atual dos problemas relatados.

<a id="hkuds-videoagent-0-9031-log-score"></a>

## HKUDS/VideoAgent: Slop Log Score de 0.9031

Aqui, o repositório está na categoria Sistema de pesquisa. Agente de pesquisa em Python, baseado em artigo científico, que traduz a intenção em fluxos de trabalho e planos de ferramentas com feedback. Inclui recorte, montagem e remix, além de geração. Avalie separadamente dos editores para usuários finais; esta auditoria não valida as alegações de qualidade profissional.

A discussão de diretório da amostra trata de um site de terceiros, não de um erro de execução do VideoAgent. Um relato separado sobre dependências alega diferenças na resolução de pacotes; não há resposta visível de um mantenedor. O convite para hospedar o dataset é uma discussão da comunidade, não um defeito.

Discussões selecionadas: [thread de promoção/suporte de terceiros](https://github.com/HKUDS/VideoAgent/issues/14); [thread de bug/relato de dependências](https://github.com/HKUDS/VideoAgent/issues/16); [thread da comunidade/distribuição de dataset](https://github.com/HKUDS/VideoAgent/issues/11).

<a id="browser-use-video-use-0-8316-log-score"></a>

## browser-use/video-use: Slop Log Score de 0.8316

Aqui, o repositório está na categoria skill de edição de gravações. Skill para agentes de programação que transforma uma pasta de gravações brutas em uma transcrição/EDL e um MP4 via FFmpeg, com inspeção por filmstrip/forma de onda e correções limitadas por autoavaliação. MIT. A configuração de transcrição documentada exige uma chave de API da ElevenLabs; não é uma interface gráfica de linha do tempo.

As threads selecionadas incluem material fora do tema e um pedido de criação de vídeo; elas não estabelecem um defeito de software. As respostas de comentários disponíveis eram menos numerosas do que os contadores exibidos, por motivos desconhecidos.

Threads selecionadas: [#101](https://github.com/browser-use/video-use/issues/101), [#74](https://github.com/browser-use/video-use/issues/74) e [#33](https://github.com/browser-use/video-use/issues/33).

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

<a id="gvclab-cutclaw-0-4771-log-score"></a>

## GVCLab/CutClaw: Slop Log Score de 0.4771

Aqui, o repositório está na categoria Sistema de pesquisa. Gravações longas e músicas alimentam descrições estruturadas, planejamento de tomadas multiagente, verificações e renderização. Interfaces CLI/Streamlit; Python 3.12 e decodificação por GPU recomendada. O MCP está no roadmap, não é um recurso atual verificado. Não conseguimos estabelecer uma licença clara.

Um colaborador disse que apenas um vídeo de origem havia sido testado, embora várias fontes pudessem, em princípio, ser suportadas. As outras discussões pedem um fluxo multicâmera e descrevem uma segmentação experimental por batidas, omitida por estabilidade; elas não comprovam recursos lançados.

Discussões selecionadas: [thread de recurso](https://github.com/GVCLab/CutClaw/issues/10); [thread de suporte/capacidade](https://github.com/GVCLab/CutClaw/issues/8); [thread de suporte/recurso](https://github.com/GVCLab/CutClaw/issues/5).

<a id="dakkshin-after-effects-mcp-0-4559-log-score"></a>

## Dakkshin/after-effects-mcp: Slop Log Score de 0.4559

Aqui, o repositório está na categoria Integração de composição com After Effects. MCP e ExtendScript controlam composições, camadas, texto, formas, máscaras, propriedades, keyframes e animação no After Effects instalado. MIT. É uma ponte de composição, não um NLE independente para edição de gravações. A versão mínima do Node documentada é antiga; último push em 1º de abril de 2026.

Usuários relatam um painel da ponte em branco, com uma correção proposta, mas sem release com a solução confirmada por um mantenedor. Outra thread relata exposição do caminho de presets em um commit específico; não reproduzimos isso de forma independente. Uma publicação promocional selecionada não é evidência de defeito.

Discussões selecionadas: [thread de bug](https://github.com/Dakkshin/after-effects-mcp/issues/7); [thread de bug](https://github.com/Dakkshin/after-effects-mcp/issues/43); [outra thread](https://github.com/Dakkshin/after-effects-mcp/issues/39).

<a id="univa-verse-univa-0-3979-log-score"></a>

## UniVA-Verse/UniVA: Slop Log Score de 0.3979

Aqui, o repositório está na categoria generalista de pesquisa. Arquitetura de agente planejar/agir com ferramentas MCP de processamento, edição e geração, backend em Python e interface de linha do tempo; compreensão/segmentação orientam as edições. MIT. Redirecionamento canônico de univa-agent/univa. Sistema de pesquisa com dependências de provedores/modelos locais, não um NLE comprovado para o consumidor; frontend adaptado do OpenCut.

Nenhuma issue aberta recente atendeu aos critérios de seleção. Isso não comprova que o software esteja livre de bugs.

<a id="calesthio-openmontage-0-3734-log-score"></a>

## calesthio/OpenMontage: Slop Log Score de 0.3734

Aqui, o repositório está na categoria Orquestrador de produção abrangente. Sistema agêntico que abrange pesquisa, roteiros, assets, edição e composição. Seu README documenta clipes de vídeo reais colocados em uma linha do tempo e renderizados, junto com assets gerados. Inclui aprovação de storyboard e revisão local. Vai além de um NLE, com custos e autenticação de provedores específicos de cada pipeline.

A issue selecionada com mais comentários hospeda anexos de trailers; outra recruta revisores. A thread de integração com o Hermes traz relatos divergentes, incluindo um preflight bem-sucedido e uma preocupação posterior com o fluxo de trabalho, sem resolução final de um mantenedor.

Discussões selecionadas: [thread administrativa/de upload de mídia](https://github.com/calesthio/OpenMontage/issues/1); [thread da comunidade/recrutamento de revisores](https://github.com/calesthio/OpenMontage/issues/149); [thread de suporte/integração](https://github.com/calesthio/OpenMontage/issues/165).

<a id="veedstudio-open-edit-0-3150-log-score"></a>

## veedstudio/open-edit: Slop Log Score de 0.3150

Aqui, o repositório está na categoria pipeline de edição orientado por código. CLI e skill de agente para legendas sincronizadas palavra por palavra e HTML para vídeo, com renderização em Chrome headless, rerrenderizações parciais, saída de quadros estáticos/folha de contato e muxing de áudio. Apache-2.0. O código-fonte atual documenta seu renderizador baseado em Chrome; as alegações antigas de que seria necessário um renderizador fechado da VEED estão desatualizadas. A transcrição pode ser local ou hospedada.

A discussão selecionada pergunta sobre assinatura para Windows e compatibilidade offline e relata uma falha na inicialização. Quem respondeu diz que não há build assinado disponível e que o fluxo offline não foi testado; não confirmamos de forma independente a autoridade dessa pessoa no projeto.

Discussões selecionadas: [thread de suporte](https://github.com/veedstudio/open-edit/issues/25).

<a id="aepzie-cutline-0-2730-log-score"></a>

## Aepzie/cutline: Slop Log Score de 0.2730

Aqui, o repositório está na categoria Editor no navegador. O NLE no navegador e o MCP compartilham operações tipadas sobre uma linha do tempo declarativa. Documenta trim/split/ripple, legendas, keyframes, sobreposições e transcrição. A demo ainda é um placeholder, e alguns recursos anunciados também aparecem no roadmap; esta auditoria não comprova que os recursos estejam completos.

Os pedidos selecionados tratam de formas de onda na linha do tempo, da opção de remover assets na interface do editor e da preservação do histórico de desfazer após reiniciar o servidor. Eles descrevem necessidades de recursos e de persistência, não falhas de exportação demonstradas.

Discussões selecionadas: [thread de recurso](https://github.com/Aepzie/cutline/issues/8); [thread de recurso/usabilidade](https://github.com/Aepzie/cutline/issues/11); [thread de recurso/persistência](https://github.com/Aepzie/cutline/issues/10).

<a id="diffusionstudio-editor-0-2556-log-score"></a>

## diffusionstudio/editor: Slop Log Score de 0.2556

Aqui, o repositório está na categoria editor desktop baseado em código. Pessoas e agentes editam gravações reais pelo mesmo documento baseado em código, com inspeção, verificação, renderização e suporte headless via MCP/CLI. MPL-2.0. Os downloads atuais para desktop atendem macOS em Apple Silicon e Windows x64. É diferente do framework mais antigo diffusionstudio/agent.

Um colaborador relata que os defeitos originais do build para Windows e do handshake foram corrigidos na main e na v0.206.0; o autor do relato pretendia testar de novo, e a inicialização automática a partir de um checkout do código-fonte continuava sendo uma limitação. Outras threads pedem suporte a Linux e a navegador; uma implementação parcial vinculada não comprova um recurso lançado.

Discussões selecionadas: [thread de bug](https://github.com/diffusionstudio/editor/issues/82); [thread de recurso](https://github.com/diffusionstudio/editor/issues/40); [thread de recurso](https://github.com/diffusionstudio/editor/issues/52).

<a id="weftcut-weftcut-0-2283-log-score"></a>

## WeftCut/WeftCut: Slop Log Score de 0.2283

Aqui, o repositório está na categoria Editor desktop. NLE desktop com MCP local, linha do tempo compartilhada entre pessoas e agentes, legendas, keyframes, áudio, checkpoints e dry runs. Explicitamente pré-1.0. Há CI multiplataforma e documentação de testes; o assistente de conexão MCP não é evidência de um renderizador headless independente.

Um autor de relato confirmou melhorias na amostragem de vídeos longos na v0.5.2, e um mantenedor descreveu controles adicionais na v0.5.5. Outras threads acompanham pesquisas sobre o desempenho da prévia e critérios de aceitação mais amplos para a v1; uma thread guarda-chuva aberta não equivale a um único defeito sem solução.

Discussões selecionadas: [subproblemas resolvidos na thread, mas thread aberta](https://github.com/WeftCut/WeftCut/issues/69); [thread guarda-chuva/desempenho](https://github.com/WeftCut/WeftCut/issues/62); [thread guarda-chuva](https://github.com/WeftCut/WeftCut/issues/11).

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

<a id="fireredteam-firered-openstoryline-0-1331-log-score"></a>

## FireRedTeam/FireRed-OpenStoryline: Slop Log Score de 0.1331

Aqui, o repositório está na categoria orquestrador de edição conversacional. Busca e segmentação de mídia, planejamento da história, narração/música e operações conversacionais de cortar, trocar e reordenar, além de skills reutilizáveis de estilo e de corte bruto de falas. Apache-2.0 e baseado em Python. As transições opcionais com IA usam serviços de terceiros, com incerteza documentada sobre custo e resultado. Não apresente itens de TODO como recursos lançados.

Duas threads de suporte descrevem erros na inicialização de conversas e a investigação da conectividade de proxy ou MCP. Um usuário relata uma solução alternativa, enquanto outros continuam com falhas; o pedido de provedor selecionado não comprova uma integração lançada.

Discussões selecionadas: [thread de suporte](https://github.com/FireRedTeam/FireRed-OpenStoryline/issues/30); [thread de suporte](https://github.com/FireRedTeam/FireRed-OpenStoryline/issues/76); [thread de recurso](https://github.com/FireRedTeam/FireRed-OpenStoryline/issues/104).

<a id="beatapi-beatdesign-0-1004-log-score"></a>

## BeatAPI/BeatDesign: Slop Log Score de 0.1004

Aqui, o repositório está na categoria editor local de canvas e linha do tempo. Canvas e editor compartilhados com MCP para cortar, dividir, mover, mixar áudio, sobrepor imagens, legendar e renderizar em MP4. Apache-2.0. A v0.2.5 publicada tem 30 ferramentas, contra 38 no código-fonte ainda não lançado. A edição local não precisa de chave de API; geração e análise precisam. Não dê a entender que transições avançadas ou o empacotamento para desktop já foram lançados.

As discussões selecionadas propõem provedores externos ou parcerias; um dos autores disse explicitamente que não havia validado o fluxo completo. Elas não são evidência de defeito.

Discussões selecionadas: [thread de recurso](https://github.com/BeatAPI/BeatDesign/issues/34); [thread de recurso](https://github.com/BeatAPI/BeatDesign/issues/19).

<a id="hetpatel-11-adobe-premiere-pro-mcp-0-0990-log-score"></a>

## hetpatel-11/Adobe_Premiere_Pro_MCP: Slop Log Score de 0.0990

Aqui, o repositório está na categoria Integração com Premiere Pro. Um MCP local se conecta a um painel CEP e ao ExtendScript para operações na linha do tempo, keyframes/ducking de áudio e exportação pelo Media Encoder. MIT. Requer o Premiere e o Node instalados. O CEP é suportado; o UXP é experimental. As alterações que o instalador faz nas configurações de debug/cliente exigem revisão cuidadosa, não execução automática.

Nenhuma issue aberta recente atendeu aos critérios de seleção. Isso não comprova que o software esteja livre de bugs.

<a id="ronak-create-fablecut-0-0882-log-score"></a>

## ronak-create/FableCut: Slop Log Score de 0.0882

Aqui, o repositório está na categoria Editor no navegador. Editor no navegador com linha do tempo em JSON, REST/MCP, clipes, efeitos, transições e keyframes. Há scripts de teste em Node. Controle pelo agente não é o mesmo que visão do agente: a inspeção de frames/folha de contato continua como um pedido de recurso em aberto.

As discussões selecionadas tratam de uma integração proposta com o Rive, da política de runtime do Node e de CI e de ferramentas de inspeção de frames. A demo de um colaborador não prova que uma integração foi lançada.

Discussões selecionadas: [thread de recurso](https://github.com/ronak-create/FableCut/issues/62); [thread de manutenção](https://github.com/ronak-create/FableCut/issues/64); [thread de recurso](https://github.com/ronak-create/FableCut/issues/5).

<a id="pireel-pireel-0-0792-log-score"></a>

## pireel/pireel: Slop Log Score de 0.0792

Aqui, o repositório está na categoria editor de linha do tempo no navegador. Edição local em canvas e linha do tempo, com legendas, gráficos, áudio e exportação. Agentes externos se conectam por um plugin público separado. Editor sob AGPL-3.0-only e plugin com licença Apache separada. Não presuma que o chat hospedado e os recursos de serviços conectados estejam disponíveis na edição auto-hospedada.

As duas threads selecionadas propõem contexto de pesquisa opcional e um provedor de roteamento de modelos. Nenhuma delas comprova que essas integrações foram implementadas.

Discussões selecionadas: [thread de recurso](https://github.com/pireel/pireel/issues/6); [thread de recurso](https://github.com/pireel/pireel/issues/7).

<a id="mhadifilms-dvr-0-0742-log-score"></a>

## mhadifilms/dvr: Slop Log Score de 0.0742

Aqui, o repositório está na categoria Integração com DaVinci Resolve. Biblioteca Python tipada, CLI e MCP para edição declarativa, cor e entrega, com JSON estruturado e diagnóstico de conexão. MIT. Requer o Resolve em execução. A afirmação do mantenedor de que o projeto é estável desde a 1.0 não é um resultado de testes práticos; a compatibilidade entre edições precisa de verificação versão a versão.

Dois relatos específicos de ambiente descrevem um TypeError na API da galeria do Resolve e um problema na ordem dos argumentos de faixas de áudio. Nenhum deles tem correção confirmada nos comentários da amostra, e não reproduzimos nenhum dos dois de forma independente.

Discussões selecionadas: [thread de bug](https://github.com/mhadifilms/dvr/issues/10); [thread de bug](https://github.com/mhadifilms/dvr/issues/7).

<a id="deonmenezes-edit-ai-0-0631-log-score"></a>

## deonmenezes/edit-ai: Slop Log Score de 0.0631

Aqui, o repositório está na categoria Editor e harness de agentes. Harness TrueForge, linha do tempo no navegador e ferramentas de edição via MCP; remoção de silêncios, legendas, cortes no ritmo da batida e sessões retomáveis. Serviços e credenciais de provedores separados, sandbox opcional; não testamos de forma independente as alegações sobre aprovação.

As threads selecionadas tratam da cobertura de testes para veredictos de bot, da configuração do conector de demo e da arquitetura do fluxo de merge. Elas não comprovam uma falha de renderização de vídeo.

Discussões selecionadas: [thread de manutenção/cobertura de testes](https://github.com/deonmenezes/edit-ai/issues/19); [thread de manutenção/configuração](https://github.com/deonmenezes/edit-ai/issues/18); [thread de manutenção/arquitetura](https://github.com/deonmenezes/edit-ai/issues/17).

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

<a id="diffusionstudio-agent-0-0126-log-score"></a>

## diffusionstudio/agent: Slop Log Score de 0.0126

Aqui, o repositório está na categoria agente antigo de composição por código. O VideoComposerAgent, em Python, recupera documentação semântica e cria composições usando as APIs do Diffusion Studio. MIT. Último push em 10 de fevereiro de 2025. É um framework mais antigo, não o editor desktop atual; a integração com MCP continua na lista de TODO do README.

Nenhuma issue aberta recente atendeu aos critérios de seleção. Isso não comprova que o software esteja livre de bugs.

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

<a id="canadaapollo6-kinewright-0-0000-log-score"></a>

## CanadaApollo6/Kinewright: Slop Log Score de 0.0000

Aqui, o repositório está na categoria Editor nativo. Editor nativo em Rust para Windows/Linux, em que agentes de CLI usam as mesmas operações de edição e a mesma pilha de desfazer da interface gráfica. Documenta gravações, edição pela transcrição, correção de cor, mixagem e exportação. Explicitamente em fase inicial de desenvolvimento; segundo o README, o projeto ainda não alcançou prévia em 1080p com taxa de quadros completa.

Nenhuma issue aberta recente atendeu aos critérios de seleção. Isso não comprova que o software esteja livre de bugs.

<a id="daredev256-fcp-mcp-server-0-0000-log-score"></a>

## DareDev256/fcp-mcp-server: Slop Log Score de 0.0000

Aqui, o repositório está na categoria Integração com XML do Final Cut Pro. Lê, edita e gera FCPXML para trims, splits, remoção de silêncios, cortes brutos, keyframes, rampas de velocidade e edições pela transcrição; modo ao vivo opcional no macOS. MIT. A documentação descreve escritas com journal, proteções por hash e desfazer. A inspeção de mídia difere das visualizações apenas de XML. O Final Cut é um aplicativo host pago e separado.

Nenhuma issue aberta recente atendeu aos critérios de seleção. Isso não comprova que o software esteja livre de bugs.

<a id="matrodrigs-shotcut-mcp-0-0000-log-score"></a>

## matrodrigs/shotcut-mcp: Slop Log Score de 0.0000

Aqui, o repositório está na categoria Integração com Shotcut. Um MCP transacional cria, edita, valida, gera prévias e renderiza linhas do tempo MLT nativas, incluindo faixas, transições, títulos, legendas e folhas de contato. MIT. Requer Python e Shotcut/MLT. O CI multiplataforma não comprova renderização real em todas as plataformas; a integração documentada com renderização real é específica para Windows.

Nenhuma issue aberta recente atendeu aos critérios de seleção. Isso não comprova que o software esteja livre de bugs.

<a id="naman-sharma12345-kimo-0-0000-log-score"></a>

## naman-sharma12345/kimo: Slop Log Score de 0.0000

Aqui, o repositório está na categoria Motor de edição headless. Motor em Rust/C++ exposto via MCP e CLI para cortes, correção de cor, keyframes e exportação. O spectator é somente leitura, não uma interface gráfica de edição. Requer FFmpeg. O Linux tem o caminho testado mais claro; o CI no Windows não é validação em hardware, e a documentação descreve o macOS como não testado.

Nenhuma issue aberta recente atendeu aos critérios de seleção. Isso não comprova que o software esteja livre de bugs.

<a id="remocn-remocn-studio-0-0000-log-score"></a>

## Remocn/remocn-studio: Slop Log Score de 0.0000

Aqui, o repositório está na categoria Composição por código dirigida por agentes. Agentes de programação criam projetos Remotion editáveis, com prévia ao vivo, atualizações por apontar e editar e artefatos de revisão em etapas. Explicitamente sem interface convencional de linha do tempo/keyframes/faixas; macOS/Linux e CLI de agente externo.

Nenhuma issue aberta recente atendeu aos critérios de seleção. Isso não comprova que o software esteja livre de bugs.

## O que o Slop Benchmark mostra no geral

Todos os 38 repositórios mostrados têm pontuação calculável. Projetos sem releases e com PRs mesclados usam o fallback de B explicitamente reduzido pela metade, então suas pontuações não são diretamente comparáveis a uma média completa das duas medidas. As contagens de releases também refletem práticas de publicação diferentes: o mcut inclui 195 pré-lançamentos em 206 registros, enquanto o repositório do Resolve MCP tem 486 releases publicadas.

Licenças e limites de cada produto também pesam, além dos números. Kerf e Vex usam PolyForm Noncommercial; o Hypit usa uma licença Apache modificada com restrições. O código-fonte público sob GPL do Palmier termina em v0.7.6/last-gpl-source, e os binários posteriores são proprietários. Antes de adotar qualquer um deles, revise as licenças atuais, as dependências e as threads de issues específicas que se cruzam com o seu fluxo de trabalho.
