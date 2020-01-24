# MiniWix

Miniwix est un petit éditeur de templates, accessible via login (avec une base de données). Les identifiants du compte créé sont:
username : Velvet
password : Megalovania
J'ai exporté ma base de données pour que vous puissiez la récupérer, il y a un user et un contenu de template.
Une fois connecté, on accède à la page d'édition de templates. Dans un premier temps, elles sont chargées et prennent la forme de miniatures cliquables. Cliquer sur une miniature ouvre la fenêtre d'édition, qui se décompose en 3 parties :
-le panneau de création de widgets à gauche, qui permet d'ajouter des éléments au template en cliquant sur les boutons ou en drag-drop
-la fenêtre du template, qui contient le template que l'on est en train d'éditer
-le panneau détails, qui affiche les informations de l'élément sélectionné et permet de les modifier
On peut sélectionner un élément en cliquand dessus dans la fenêtre d'édition de template. A droite s'affichent les propriétés modifiables. 
J'avais l'intention de permettre à l'utilisateur de faire glisser la souris sur l'élément sélectionné pour le déplacer facilement, ainsi que pouvoir modifier sa taille en attrapant les coins du sélecteur mais j'ai manqué de temps et comme on peut toujours modifier les positions depuis le panneau détails, il s'agit d'une fonctionnalité secondaire et pas indispensable.
Aussi, j'avais commencé à implémenter certaines fonctionnalités, comme le système d'ancres, qui définit basiquement le point d'ancrage des éléments pour déterminer leur position, mais cela complexifie beaucoup les choses et je ne l'ai pas terminé, donc il vaut mieux éviter de modifier cette valeur pour le moment. 
On a également la possibilité de sauvegarder les templates éditées (dans le panneau des widgets), qui sont stockées dans la base de données. Il y a une faille à ce niveau, il devrait y avoir un id attaché à chaque template pour pouvoir remplir les templates avec les bonnes données provenant de la base de données. 
Il y a aussi un léger soucis quand on édite une propriété d'un élément : sa position s'actualise et ne correspond pas toujours à sa position de base. Je pense qu'il s'agit d'un problème de position absolue vs relative.
Enfin dans tous les cas, il y aura toujours moyen de l'améliorer/corriger.

Concernant mon ressenti, j'ai beaucoup aimé cet exercice. J'ai essayé de créer une sorte d'éditeur en ayant comme référence l'interface d'unity, en beaucoup plus simplifiée évidemment. J'avais en réalité beaucoup (trop) d'idées, et je n'ai forcément pas pu tout faire mais je suis tout de même satisfait du résultat, même si il y a quelques bugs et je n'ai pas pu consacrer beaucoup de temps à la présentation...

Je n'ai presque pas pu avancer pendant le week end, donc j'y ai travaillé un peu chaque soir. 