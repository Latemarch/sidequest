// 상수 데이터들을 저장해주시면 됩니다.
// 선언 명 예시
// const PROJECT_DATA = []

export const STACKS_CATEGORIES: { [key: string]: string } = {
  language: '언어',
  front: '프론트엔드',
  backend: '백엔드',
  game: '게임',
  mobile: '모바일',
  communication: '커뮤니케이션',
  etc: '기타',
};

export const STACKS: { [key: string]: string[] }[] = [
  {
    language: [
      'php',
      'python',
      'ruby',
      'swift',
      'type_scriypt',
      'csharp',
      'cplus',
      'c',
      'go',
      'java',
      'java_script',
      'kotlyn',
    ],
  },
  {
    front: [
      'nuxt',
      'react',
      'react_query',
      'recoil',
      'redux',
      'redux_saga',
      'remix',
      'sass',
      'styled_components',
      'svelt',
      'tailwind',
      'vite',
      'vue',
      'webpack',
      'angular',
      'axios',
      'bootstrap',
      'css',
      'html',
      'jest',
      'imotion',
      'jquery',
      'mobx',
      'next_js',
    ],
  },
  {
    backend: [
      'node',
      'oracle_db',
      'postgre_sql',
      'redis',
      'spring',
      'spring_boot',
      'tomcat',
      'arango_db',
      'django',
      'docker',
      'ejs',
      'express',
      'firebase',
      'h2_db',
      'jpa',
      'jsp',
      'graph_ql',
      'kubernetes',
      'maria_db',
      'mysql',
      'mongo_db',
      'nest_js',
    ],
  },
  { game: ['unity'] },
  { mobile: ['react_native', 'expo', 'flutter'] },
  {
    communication: ['notion', 'source_tree', 'github', 'git', 'jira', 'figma'],
  },
  {
    etc: [
      'nginx',
      'postman',
      'prettier',
      'storybook',
      'aws',
      'aws_ec2',
      'aws_route53',
      'aws_lambda',
      'aws_s3',
      'eslint',
    ],
  },
];
