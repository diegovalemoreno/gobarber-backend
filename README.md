# gobarber
## Aula 6 - Padrão de código - Eslint, Prettier & EditorConfig

Padrão de código é muito útil quando se está trabalhando com um time, pq cada um pode fazer as coisas de sua maneira e a base de código não vai ficar muito boa, tem desenvolvedor que vai usar var, outro const, e outro let, vai pular linha no final, outro não vai, vai usars export default, e outro não, e isso gera uma bagunça, e aí com isso temos algumas ferramentas que ajudam a definir as regras(padrão) de código e um estilizador de código utilizando as regras, e o mais adotado na comunidade JS, é o Eslint para definir as regras e o Prettier para formatar o código conforme as regras definidas no Eslint.

Mas o ESLINT tbm não tem qualquer regra, você pode usar algumas mais utilizadas no mercado, como as guias de estilos do [Airbnb](https://github.com/airbnb/javascript "Airbnb"), [Standard](https://standardjs.com/ "Standard") e outros, cada um tem suas características e estilos de escrita, ai vai do gosto de cada um, e do padrão que seu framework adota também, no caso Adonis utilizar o Stardard, então é sugestivo você usar o Standard para criar seu projeto seguindo esse estilo.

### Configurando o projeto
**Adicionando o eslint como dependências de desenvolvimento:**

```javascript
 yarn add eslint -D
```
**Feito isso só inicializar o eslint:**

```javascript
yarn eslint --init
```

Ele vai fazer algumas perguntas e você pode configurar conforme abaixo:

<!-- ESLINT INIT -->
<br />
<p align="center">
  <img src="https://github.com/diegovalemoreno/gobarber-backend/blob/aula6/images/Eslint_init.png" alt="ESLINT INIT">

  <h3 align="center">eslint init</h3>
</p>


E só seguir respondendo o Eslint. No final ele pede para instalar as dependências, só instalar e remover o package-lock.json e executar um yarn para atualizar as dependências, isso eu faço pq não estou usando o npm e sim o yarn como gerenciador de dependência e o eslint em baixo dos panos usa o npm para instalar.

No final ele cria um arquivo:** .eslintrc.js** com as seguintes configurações padrão:

```javascript
module.exports = {
    env: {
        es6: true,
        node: true,
    },
    extends: [
        'airbnb-base',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {},
};
```

###### OBS: Preciso ter o eslint nas extensões do VSCode.

E para o eslint corrigir automaticamente quando salva o arquivo, precisa ter nas settings.json do VSCode a seguinte configuração:
```javascript

  "eslint.autoFixOnSave": true,

  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "typescript",
      "autoFix": true
    },
    {
      "language": "typescriptreact",
      "autoFix": true
    }
  ],
```

Pronto, agora já deve estar ok. Se o VSCode não estiver acusando erro de Eslint no arquivo app.js, pois com padrão Airbnb as aspas tem que ser simples, e deve ter ; no final de cada comando. Então fecha o vscode e abre novamente, ou tenta remover a nodemodules e instalar novamente: `rm -rf nodemodules/ yarn.lock && yarn`.

No .eslintrc.js, teremos uma definição de novas regras, é tipo como subscrever as regras padrão da guia de estilo airbnb no eslint, isso é necessário algumas vezes devido algum framework que iremos utilizar no dia a dia. .eslintrc.js:

```javascript
 rules: {
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    camelcase: "off",
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }]
  }
```
**Instalando o Prettier**
O Prettier melhora o código, deixando mais bonito, ele faz uma estilização a mais no código, além do que o eslint já faz.

 ```javascript
yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
```
e no .eslintrc.js preciso declarar:

```javascript
extends: ["airbnb-base", "prettier"],
plugins: ["prettier"],
 rules: {
    "prettier/prettier": "error",
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    camelcase: "off",
    "no-unused-vars": ['error', { argsIgnorePattern:  'next' }],
  }
```
Com isso o prettier está pronto para ser usado, porém, tem algumas regras de conflito entre o prettier e airbnb, então precisa de mais configuração, para desabilitar as configurações que o prettier sobrescreve do airbnb.

Criar o arquivo: **prettier.rc**:

```javascript
{
	"singleQuote":  true,
	"trailingComma":  "es5"
}
```
Defini a regra para manter aspas simples e deixar ; no final de cada instrução de código. Done!

Para corrigir todos os arquivos é só rodar:

```javascript
yarn eslint --fix src --ext .js
```
Legenda: --fix conserta tudo que está na pasta src que tenha a extensão(--ext) de arquivos .js.

###### Podemos colocar ela no package.json:

```javascript
 "scripts": {
    "dev": "nodemon src/server",
    "eslintify": "yarn eslint --fix src --ext .js"
  },
```
e rodar :
```javascript
yarn eslintify
```

Com isso, agora temos como manter o padrão de código na base de código da aplicação, se receber algum warn ou error, só ajustar conforme a sugestão do ESlint.

Mas e se os outros desenvolvedores não usam a IDE VSCode? Usam o Sublime, Vim, Atom ou WebStorm?

Ai entra o **EditorConfig**

Ele serve para que as regras definidas no Eslint e Prettier sejam aplicadas para todos as IDEs.

para isso basta criar um arquivo: **.editorConfig** na raiz do projeto com as configurações:

```javascript
root = true

[*]
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

Veja o código: https://github.com/diegovalemoreno/gobarber-backend/tree/aula6
