---
title: "Avaliação do Paperclip: minha experiência com Coolify e Codex"
meta_title: "Avaliação do Paperclip: Coolify e Codex"
meta_description: "Minha experiência com o Paperclip: organização de agentes de IA, assinatura do Codex e problemas de implantação, contabilização e rotinas."
published: "2026-10-27"
updated: "2026-10-27"
---

Queria uma equipe de agentes de IA que pudesse ajudar a administrar minha empresa.

Trabalho com [marketing de clientes](/pt-br/servicos/), projetos de software, pesquisa, conteúdo e operações. Queria agentes capazes de compartilhar contexto, se comunicar, usar minhas ferramentas e encaminhar trabalho para revisão, com permissões e aprovações.

Foi isso que me atraiu ao [Paperclip](https://github.com/paperclipai/paperclip).

Implantei a plataforma no Coolify, conectei minha assinatura do Codex e comecei a configurar os agentes. Vi o potencial, mas também enfrentei problemas de implantação, falhas na instalação de plugins, bloqueios de contabilização com gasto registrado de US$ 0 e uma rotina interna que usava `built-in-bundles` como usuário humano responsável.

O Paperclip ofereceu formas úteis de organizar agentes, mas gastei tempo demais resolvendo problemas para depender dele durante essa configuração. Vou tratá-lo como um experimento até conseguir executar e recuperar tarefas com confiança.

## O que é o Paperclip?

O Paperclip é uma plataforma para organizar agentes de IA em torno do trabalho de uma empresa. Na minha instalação, ele oferecia agentes, tarefas, rotinas, orçamentos, permissões e histórico de execuções.

## O que gostei no Paperclip

O principal atrativo foi ter um lugar para organizar agentes em torno de trabalho real.

Na minha instalação, pude configurar agentes como um CMO, uma assistente, um redator e um sumarizador. As configurações incluíam instruções, habilidades, ambiente de execução, ferramentas, permissões e orçamentos. As tarefas tinham histórico, execuções, detalhes de falhas e informações de recuperação.

Essa estrutura importa para mim. Quero saber em que cada agente está trabalhando, a que ele tem acesso, o que aconteceu durante uma execução e quando é necessária intervenção humana.

Também me interessou conectar minha assinatura existente do Codex. Queria usar uma conta que já pagava antes de assumir outra cobrança de API por uso. Consegui fazer o ambiente de login separado funcionar com o Daytona após corrigir as permissões do cache do npm e instalar as dependências de compilação do plugin.

As informações de diagnóstico também foram úteis. Embora algumas mensagens da interface fossem vagas, os registros detalhados de execução e o endpoint de contabilização ajudaram a identificar as falhas.

## Como disponibilizei a aplicação pelo Coolify

Meu primeiro problema foi um sintoma comum de implantação: **Bad Gateway**.

Configurei o domínio e o nome de host permitido, mas os logs mostravam inicialmente o Paperclip escutando em `127.0.0.1:3100` dentro do contêiner. Alinhar o endereço de escuta, as configurações de implantação e o roteamento do Coolify foi a primeira etapa de investigação.

Ao mudar para uma implantação pública autenticada, surgiu outra exigência: o Paperclip recusou iniciar com o PostgreSQL embutido. A mensagem dizia:

> authenticated public deployments require DATABASE_URL or config.database.connectionString

Precisei configurar uma conexão externa com PostgreSQL para continuar.

Essas exigências de implantação são diferentes dos problemas posteriores. Uma aplicação exigir determinada configuração de rede ou banco de dados não é, por si só, um defeito. Ainda assim, aumentou o esforço necessário para colocá-la em funcionamento.

## O login por assinatura exigiu mais configuração

Meu ambiente público de servidor não permitia o login pelo navegador para conectar a assinatura da OpenAI. O Paperclip informou:

> This environment does not support browser sign-in.

Usei o Daytona, um provedor de ambientes isolados, para criar um ambiente separado de login. A instalação do plugin também trouxe problemas.

Primeiro, o npm falhou porque seu cache continha arquivos pertencentes ao usuário root. Depois de corrigir as permissões, a compilação do plugin falhou com:

```text
tsc: not found
```

Acabei conseguindo instalar o plugin e fazer o ambiente funcionar.

Depois, o teste de saudação do Codex, que pede ao agente para responder “hello”, falhou porque a versão instalada da CLI era antiga demais para o modelo selecionado. Foi necessário atualizar o Codex no ambiente em que o agente era executado.

Até então, eu já estava lidando com banco de dados, rede de contêineres, permissões do npm, dependências do plugin, ambientes isolados e compatibilidade da CLI antes de chegar a um fluxo de trabalho confiável.

## Bloqueado com US$ 0 em gastos registrados

O bloqueio de contabilização me impediu de retomar tarefas atribuídas.

A interface mostrava **US$ 0,00 em gastos de API**, mas um agente estava pausado por um incidente de orçamento. As tentativas de retomar o trabalho falharam porque a contabilização estava incompleta.

O endpoint de saúde da contabilização, uma URL de diagnóstico com os registros de uso pendentes, mostrava:

```text
pendingRunCount: 4
unpricedEventCount: 0
```

`pendingRunCount` conta as execuções cuja contabilização ainda não terminou. `unpricedEventCount` conta eventos de uso sem preço confiável. As quatro execuções pendentes estavam marcadas como:

```text
waiting_for_receipt
```

O Paperclip aguardava os registros finais de uso. Os US$ 0 exibidos representavam os gastos conhecidos; isso não significava que toda a contabilização havia terminado.

Bloquear o trabalho quando os gastos são incertos é compreensível. O problema foi não encontrar uma forma simples de resolver os registros ausentes e continuar.

Encontrei um relato, a [issue #15649](https://github.com/paperclipai/paperclip/issues/15649), sobre a mesma classe de bloqueio, incluindo relatos posteriores de 24 de outubro envolvendo Codex com assinaturas do ChatGPT. Os sintomas são relacionados, mas esses relatos não provam que minha instalação teve a mesma causa.

Aumentar o orçamento não resolveu o bloqueio. Desativar a opção que impede trabalho com uso sem preço também não ajudou, pois minha instalação tinha registros finais ausentes e nenhum evento sem preço.

É uma experiência difícil para quem administra o sistema: ele interrompe o trabalho por precaução, mas a recuperação se torna outro projeto de investigação.

## Uma rotina interna usou uma identidade de usuário inválida

A rotina interna Summarizer apresentou outro problema. Suas execuções falharam imediatamente com:

> The responsible user is not an active company member

A interface sugeria reconectar a conta de IA selecionada. Porém, o resultado detalhado mostrava:

```json
"responsibleUserId": "built-in-bundles"
```

O Paperclip tentava usar um identificador interno como usuário humano responsável.

A [issue #12246](https://github.com/paperclipai/paperclip/issues/12246), registrada em 26 de agosto, menciona relatos anteriores de rotinas internas armazenando a mesma identidade `built-in-bundles`. Minha execução também mostrou esse valor, embora eu não tenha verificado se o caminho de código era idêntico.

O seletor “Responsible” visível não resolveu o problema: ele oferecia agentes, enquanto o campo que falhava dizia respeito à identidade humana por trás da execução.

Esse caso mostrou a distância entre ter informações de diagnóstico e ter um processo de recuperação acessível. O erro era específico, mas a mensagem sobre reconectar a conta me direcionava para outra categoria de solução.

## Meus prós e contras

| Prós | Contras |
|---|---|
| Estrutura útil para organizar agentes, tarefas e trabalho recorrente | Esforço considerável na implantação pelo Coolify |
| Instruções, habilidades, ferramentas, permissões e orçamentos em uma interface | Instalação do plugin exigiu investigação manual |
| Possibilidade de conectar minha assinatura existente do Codex | Ambientes de login e execução acrescentaram complexidade |
| Registros detalhados ajudaram a revelar falhas | Algumas mensagens de recuperação eram genéricas |
| Histórico de tarefas e execuções deu visibilidade ao trabalho interrompido | Registros de contabilização ausentes impediram uma retomada simples |
| Agentes internos ofereceram um ponto de partida | Uma rotina interna usou uma identidade de usuário responsável inválida |

## Eu recomendaria o Paperclip?

Para quem gosta de experimentar infraestrutura de agentes e se sente à vontade para investigar problemas, vejo o apelo.

Para minha empresa, preciso que o tempo economizado pelos agentes supere o tempo gasto mantendo a plataforma. Durante essa configuração, ainda não cheguei a esse ponto.

Também usei assistência de IA para investigar os problemas, e algumas orientações recebidas estavam incorretas. Isso aumentou a dificuldade. Não atribuo ao Paperclip todas as tentativas de solução que falharam.

Mas os bloqueios por registros ausentes e a identidade inválida da rotina interna foram problemas concretos, sustentados pela saída da minha instalação e por relatos públicos relacionados.

Continuo querendo tarefas compartilhadas, supervisão e um histórico visível para meus agentes. O Paperclip reuniu esses controles, mas eu ainda não podia depender dos fluxos de execução e recuperação.

Antes de confiar nele, preciso de execução confiável e de uma maneira clara de recuperar o trabalho quando algo falhar. Minha experiência mostrou potencial na organização, mas dificuldades operacionais demais sem solução.

## Principais conclusões

- O Paperclip oferece uma estrutura compartilhada para tarefas e supervisão dos agentes.
- Minha implantação no Coolify exigiu um banco PostgreSQL externo e configuração adicional para entrar com a assinatura.
- Registros de uso ausentes e a identidade inválida de uma rotina interna bloquearam o trabalho.
- Os detalhes de execução e contabilização ajudaram na investigação, mas a recuperação continuou difícil.

## Resumo

O Paperclip oferece controles úteis para gerenciar uma equipe de IA. Minha instalação em servidor próprio exigiu tanta investigação que ainda não consegui depender dela para o trabalho da empresa.

*Esta avaliação descreve minha experiência com uma instalação própria em 26 e 27 de outubro de 2026. Não é uma avaliação de longo prazo de todos os recursos do Paperclip.*
