---
title: "Minha experiência configurando o OpenClaw: promissor, mas frustrante"
meta_title: "Avaliação do OpenClaw: minha experiência com Coolify e Codex"
meta_description: "Minha experiência hospedando o OpenClaw no Coolify: conexão com o Codex, investigação de respostas em branco no chat, segurança e atualizações."
published: "2026-10-27"
updated: "2026-10-27"
---

**Autor:** Andrew Philip Weilbacher, fundador da Advanced Digital Marketing LTDA.

## Resumo

Implantei o OpenClaw no Coolify para criar um assistente hospedado no meu próprio servidor para tarefas da empresa. O gateway acabou iniciando e meu login do Codex parecia válido, mas o chat devolvia respostas em branco. Também precisei ajustar as configurações de segurança e encontrei uma atualização que exigia uma migração intermediária. Não cheguei a um fluxo de trabalho funcional com o Discord ou com o gerenciamento de projetos, então decidi testar outras opções.

## Principais conclusões

- **Um gateway em execução não significou um assistente funcionando.** As mensagens chegavam ao agente, mas nunca recebi uma resposta útil no chat.
- **A autenticação do Codex foi só uma parte da configuração.** Um perfil OAuth aparentemente válido não resolveu as respostas em branco nem os problemas de configuração do modelo.
- **A segurança exigiu configuração manual.** As mudanças zeraram as descobertas críticas da auditoria, mas dois alertas continuaram em análise.
- **As atualizações exigiam orientações específicas para cada versão.** Saltar direto da versão instalada para a imagem mais recente falhou porque era necessária uma migração intermediária. As orientações de atualização do assistente de IA contribuíram para o problema.
- **O fluxo de trabalho que eu queria ficou sem teste.** Não consegui estabelecer uma conexão funcional com o Discord, uma integração com o gerenciamento de projetos nem um fluxo de aprovação confiável.

Eu queria um assistente de IA hospedado no meu próprio servidor, com quem pudesse conversar pelo Discord, que se conectasse ao meu sistema de gerenciamento de projetos e que, com o tempo, me ajudasse a coordenar o trabalho da empresa.

O OpenClaw parecia uma boa opção. Ele prometia um assistente de IA capaz de se conectar a plataformas de mensagens, usar ferramentas e rodar no meu próprio servidor. Eu já uso o Coolify para gerenciar aplicações, então decidi implantá-lo lá.

Minha experiência foi frustrante. Coloquei o gateway para funcionar e autentiquei minha assinatura do Codex, mas nunca recebi uma resposta útil no chat. No caminho, enfrentei problemas de configuração, alertas de segurança, um problema na atualização e algumas orientações ruins do assistente de IA que me ajudava a investigar.

Conto abaixo como foi.

## Por que eu quis testar o OpenClaw

Tenho interesse em montar uma equipe de agentes de IA que ajude nas tarefas da empresa e se comunique comigo ao longo do dia. Para isso funcionar, preciso de mais do que uma janela de chat. Quero agentes que usem meu sistema atual de gerenciamento de projetos, funcionem por um aplicativo de mensagens no computador e no celular e operem com limites de segurança e fluxos de aprovação adequados.

O OpenClaw me atraiu porque eu podia hospedá-lo no meu próprio servidor e conectá-lo ao Discord. Ele também aceitava diferentes provedores de modelos de IA, incluindo a possibilidade de usar minha assinatura existente do Codex.

## A implantação começou com dificuldades

Instalei o OpenClaw pelo Coolify. No início, o serviço mostrava um erro **503 Service Unavailable**. Depois de um tempo, os logs mostraram que o gateway havia iniciado, e a página ficou disponível.

O terminal também me confundiu. Eu estava dentro do serviço do OpenClaw no Coolify, mas o terminal estava conectado ao contêiner separado do navegador. Quando tentei executar o comando `openclaw`, recebi:

```text
openclaw: not found
```

Isso deixou a configuração mais difícil de entender do que eu esperava. Acabei chegando ao contêiner principal do OpenClaw e consegui executar os comandos dele.

## Autentiquei o Codex, mas o chat continuou sem funcionar

A configuração inicial do modelo apontava para um modelo do OpenRouter que o OpenClaw informava como desconhecido. O gateway aceitava minhas mensagens no chat, mas o agente falhava antes de responder.

Eu queria usar minha assinatura do Codex, então passei pelo processo de autenticação do OpenClaw. Depois de algumas tentativas, o comando de status mostrou um perfil OAuth válido do Codex. Defini `openai-codex/gpt-5.3-codex` como o modelo padrão.

Nesse ponto, eu esperava conseguir conversar. Em vez disso, recebi respostas vazias do assistente.

Os logs mostravam que o OpenClaw iniciava e concluía as solicitações com o modelo do Codex, mas não explicavam por que as respostas vinham em branco. Tentamos trocar para outro modelo para comparar, mas o OpenClaw o recusou porque ele não estava na lista de modelos permitidos configurada.

Ou seja, o login do Codex parecia ter funcionado, mas eu continuava sem um chat funcional.

## A segurança exigiu atenção desde o início

O OpenClaw exibiu um alerta de segurança durante a configuração, e gostei de ver que ele falava abertamente dos riscos. Um agente que lê arquivos e executa ações exige mais cuidado do que um chatbot comum.

A auditoria de segurança apontou primeiro uma descoberta crítica envolvendo autenticação insegura da Control UI. Ela também alertou sobre a configuração do proxy, a conexão com o navegador e credenciais legíveis. Alterei a configuração de autenticação insegura, desativei as ferramentas com privilégios elevados e restringi o diretório de credenciais. A auditoria seguinte apontou zero descobertas críticas, embora dois alertas continuassem.

Foi um avanço, mas eu ainda não tinha terminado de revisar a configuração do proxy nem a conexão com o navegador. Para o uso que eu tinha em mente, com agentes acessando ferramentas da empresa, o Discord e um sistema de gerenciamento de projetos, eu também precisava entender o isolamento (sandboxing), as permissões e as aprovações antes de dar ao sistema qualquer acesso relevante.

## A atualização trouxe outro problema

Minha instalação rodava o OpenClaw `2026.2.6`. Depois das respostas em branco, o assistente de IA que me ajudava recomendou atualizar direto para a imagem mais recente.

Essa orientação se mostrou errada para esta instalação. A versão mais nova encontrou chaves de configuração antigas e interrompeu o processo de reparo porque alguns dados antigos exigiam uma migração intermediária. O erro dizia explicitamente para atualizar passando por uma versão anterior e executar a migração dela antes de tentar a versão mais recente de novo.

Essa distinção importa: a falha não foi só do OpenClaw. As orientações de atualização que recebi também estavam incompletas. Alguém deveria ter verificado os requisitos de migração específicos de cada versão antes de me dizer para dar o salto.

## O que gostei

A ideia por trás do OpenClaw é atraente. Gosto da perspectiva de rodar um assistente na minha própria infraestrutura, escolher um provedor de modelo, conectar plataformas de mensagens e dar a um agente acesso a ferramentas úteis.

Também gostei de o OpenClaw apresentar preocupações de segurança durante a configuração inicial e oferecer um comando de auditoria. Esses alertas me deram algo concreto para investigar.

## O que me frustrou

A distância entre colocar o gateway no ar e ter um assistente funcionando foi muito maior do que eu esperava. Enfrentei um modelo padrão desconhecido, um login do Codex que parecia ter dado certo seguido de respostas em branco, confusão com a lista de modelos permitidos e uma atualização que exigia uma migração em etapas.

A documentação e os comandos também mudavam de uma versão para outra. Algumas instruções que encontrei, ou que me passaram, valiam para uma versão mais nova do que a instalada inicialmente. Por isso, era difícil saber se um comando que falhava indicava um erro meu de configuração ou instruções que não se aplicavam à minha versão.

Também nunca cheguei à parte que me interessava: um assistente funcional no Discord, conectado ao meu sistema de gerenciamento de projetos, com um fluxo de aprovação confiável.

## Minha opinião

O OpenClaw tem uma proposta atraente, mas minha experiência pareceu inacabada. Fazer um serviço iniciar é só o começo. Preciso conseguir autenticar um modelo, enviar uma mensagem, entender as falhas, atualizar com segurança e configurar a segurança antes de depender dele para o trabalho da empresa.

Entendo por que as pessoas se empolgam com ele. Também entendo por que alguém que tenta configurá-lo pode concluir que tanta investigação não compensa.

Talvez eu volte ao OpenClaw mais tarde. Por enquanto, vou procurar outras formas de criar o assistente e o fluxo de trabalho com agentes que eu tinha em mente.
