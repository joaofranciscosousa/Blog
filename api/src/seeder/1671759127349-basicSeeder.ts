import { QueryRunner } from 'typeorm';
import bcrypt from "bcryptjs";

const categories = [
  {
    title: 'Aventura',
    slug: 'aventura',
  },
  {
    title: 'Drama',
    slug: 'drama',
  },
  {
    title: 'Ficção Científica',
    slug: 'ficcao-cientifica',
  },
  {
    title: 'Luta',
    slug: 'luca',
  },
  {
    title: 'Romance',
    slug: 'romance',
  },
];

const articles = [
  {
    title: 'Como viver as aventuras dos sonhos?',
    slug: 'como-viver-as-aventuras-dos-sonhos',
    body: '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s</p>',
    category: 'Aventura',
  },
  {
    title: 'Os benefícios de se praticar esportes frequêntemente',
    slug: 'os-beneficios-de-se-praticar-esportes-frequentemente',
    body: '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s</p>',
    category: 'Aventura',
  },
  {
    title: 'O ser humano é aventureiro?',
    slug: 'o-ser-humano-é-aventureiro',
    body: '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s</p>',
    category: 'Aventura',
  },
  {
    title: 'Como o ser humano chegou a lua?',
    slug: 'como-o-ser-humano-chegou-a-lua',
    body: '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s</p>',
    category: 'Ficção Científica',
  },
  {
    title: 'Qual o preço de um carro de aventura?',
    slug: 'qual-o-preço-de-um-carro-de-aventura',
    body: '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s</p>',
    category: 'Ficção Científica',
  },
  {
    title: 'Como saber se você está apaixonado?',
    slug: 'como-saber-se-você-está-apixonado',
    body: '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s</p>',
    category: 'Romance',
  },
  {
    title: 'As sete formas do amor',
    slug: 'as-sete-formas-do-amor',
    body: '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s</p>',
    category: 'Romance',
  },
  {
    title: 'Entenda os benefícios do beijo',
    slug: 'entenda-os-benefícios-do-beijo',
    body: '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s</p>',
    category: 'Romance',
  },
];

const users = [
  {
    email: 'admin@admin.com',
    password: '123456',
    username: 'admin',
  },
];

export async function seed(queryRunner: QueryRunner) {

  const categoriesValues = categories
    .map((category) => {
      return `('${category.title}', '${category.slug}')`;
    })
    .join(',')
    .concat(';');

  await queryRunner.query(
    `INSERT INTO categories 
      (title, slug)    
    VALUES
      ${categoriesValues};
    `,
  );

  const categoriesDatabase = await queryRunner.query(
    'SELECT id, title FROM categories;',
  );

  const articlesValues = articles
    .map((article) => {
      const [categories] = categoriesDatabase.filter(
        (category) => category.title == article.category,
      );
      return `('${article.title}', '${article.slug}', '${article.body}', ${categories.id})`;
    })
    .join(',')
    .concat(';');

  await queryRunner.query(
    `INSERT INTO articles 
      (title, slug, body, categoryId)   
    VALUES
      ${articlesValues};
    `,
  );

  const userValues = users
    .map((user) => {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(user.password, salt);
      return `('${user.email}', '${hash}', '${user.username}')`;
    })
    .join(',')
    .concat(';');

  await queryRunner.query(
    `INSERT INTO user
      (email, password, username) 
    VALUES
      ${userValues};
    `,
  );

  console.log('Seeding completed');
}
