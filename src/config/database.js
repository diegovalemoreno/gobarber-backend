module.exports = {
  dialect: 'postgres',
  host: 'postgres://wgtuffyrkluxwl:da0e32f0423fe454b179bb3de1ee84a645b1c3d0d81c385d72f7ba117c035d8f@ec2-52-71-122-102.compute-1.amazonaws.com:5432/d73fgc8b7dblgt',
  username: 'wgtuffyrkluxwl',
  password: 'da0e32f0423fe454b179bb3de1ee84a645b1c3d0d81c385d72f7ba117c035d8f',
  database: 'd73fgc8b7dblgt',
  define: {
    timestamps: true, // garante que será criado um atributo: created_at e updated_at na tabela do banco de dados.
    underscored: true, // permite o ORM criar nome de tabelas como products_item
    underscoredAll: true, // permite o ORM criar nome dos atributos com caixa baixa e _ em vez de camelCase, pois esse é a convenção de escrita no banco de dados
  },
};
