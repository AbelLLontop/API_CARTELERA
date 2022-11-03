import moduleAlias from 'module-alias';

moduleAlias.addAliases({
  '@root'  : __dirname,
  '@routes': __dirname + '/routes',
  '@controllers': __dirname + '/controllers',
  '@services': __dirname + '/services',
})

moduleAlias()