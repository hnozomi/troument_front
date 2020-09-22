const skill = 
['C', 'C#', 'C++', 'CoffeeScript', 'ECMAScript', 'Go', 'Java', 'NodeJS', 'PHP', 'Python', 'Ruby', 'Rust', 'Scala', 'Swift', 'Unity', 'TypeScript', 'JavaScript',
 'Angular','ASP.NET','Backbone.js','Bootstrap','Bulma','Django','Laravel','React','Ruby on Rails','Silverstripe','Spring','UIKit','Vue.js',
 'Apache','Nginx','HTML', 'CSS', 'UnrealEngine','GraphQL',
 'MariaDB','MongoDB','MySQL','PostgreSQL','Redis','SQLite','jQuery','Semantic UI', 'TailWind CSS', 'Material-UI','VBA',
 'Git', 'WordPress', 'Homebrew', 'npm', 'Yarn', 'Vscode', 'GitHub', 'Atom','AWS', 'Docker','Firebase','COBOL', 'Perl','Linux', 'GCP',
]

// ['HTML', 'CSS', 'JavaScript', 'React', 'Python', 'PHP', 'Ruby', 'Django', 'Vue', 'Ruby on rails', 'AWS', 'Docker', 'Go', 'Angular', 'Firebase', 'Vscode', 'C/C++', 'MySQL', 'C#', 'Java', 'VBA', 'VB.NET', 'COBOL', 'Perl', 'TypeScript', 'Kotlin', 'Scala', 'Swift', 'MariaDB', 'PostgreSQL', ]

module.exports = skill.map((name, id) => ({ id, name }))