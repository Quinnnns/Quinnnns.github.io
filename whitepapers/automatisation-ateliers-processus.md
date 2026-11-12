# Automatisation d'ateliers et de processus
### Où automatiser, dans quel ordre et avec quels contrôles : une approche Lean

*Auteur : Quentin Bourgois – Version 0.1 (brouillon) – Document de recherche et de réflexion. Il ne présente aucun résultat mesuré sur un site industriel.*

> **Convention de lecture.** Les affirmations suivies de [n] sont appuyées par une source listée en fin de document. Les passages marqués **(analyse de l'auteur)** sont des positions argumentées, non des faits sourcés.

---

## 1. Contexte et question

**(analyse de l'auteur)** Automatiser est souvent présenté comme un objectif en soi. Pour un ingénieur méthodes, la question utile est différente : **quelles fonctions automatiser, à quel niveau, dans quel ordre, et avec quels contrôles pour que l'opérateur reste capable d'agir quand ça dérape ?**

Ce document couvre deux terrains : les tâches de processus (administratif, planification, flux d'information) et le poste de travail en atelier. Il ne traite pas la conception détaillée de systèmes de sécurité machine.

## 2. Le point de départ Lean : l'automatisation avec intelligence humaine

Le jidoka consiste à donner aux machines et aux opérateurs la capacité de détecter une condition anormale et d'arrêter immédiatement le travail ; c'est l'un des deux piliers du Toyota Production System, avec le juste-à-temps.[1] Il est parfois appelé *autonomation*, c'est-à-dire une automatisation avec intelligence humaine.[1] Il donne aux équipements la capacité de distinguer pièces bonnes et mauvaises sans surveillance continue, ce qui permet à un opérateur de gérer plusieurs machines.[1] Toyota présente le jidoka comme l'arrêt automatique de la machine en cas d'anomalie, qui évite qu'une personne surveille en permanence ; l'andon alerte le responsable et le travail ne reprend pas tant que le problème n'est pas résolu.[2]

Art Byrne, dans *The Lean Post* du Lean Enterprise Institute, rapporte que Taiichi Ohno décrit l'autonomation comme « automation with a human touch » : il s'agit que les opérateurs prennent conscience des problèmes et sachent y réagir immédiatement (source secondaire, qui cite le livre d'Ohno).[3] Byrne en conclut, d'après sa propre formation et son expérience, que l'élimination des gaspillages est une meilleure approche que la recherche de l'automatisation totale, sans exclure d'ajouter de l'automatisation progressivement.[3] C'est l'avis d'un praticien, pas une démonstration.

**(analyse de l'auteur)** Cela donne un ordre de travail : d'abord **stabiliser et standardiser** le processus, ensuite **détecter et arrêter** sur anomalie, et seulement ensuite **automatiser les gestes**. Automatiser un processus instable fige le gaspillage.

## 3. Que faut-il automatiser ? Types et niveaux

Parasuraman, Sheridan et Wickens proposent de décider quelles fonctions automatiser, et jusqu'où, selon quatre classes de fonctions : acquisition d'information, analyse d'information, sélection de décision et d'action, mise en œuvre de l'action.[4] Le modèle propose un continuum de niveaux, de la commande manuelle à l'automatique complet ; l'échelle détaillée à 10 niveaux est définie pour la sélection de décision et d'action, et l'extension aux autres classes n'est pas précisée dans les extraits que j'ai lus.[4] Les auteurs soulignent que l'automatisation ne se contente pas de remplacer l'humain mais modifie son activité et peut imposer de nouvelles contraintes de coordination.[4] Leurs critères d'évaluation principaux sont les conséquences sur la performance humaine ; les critères secondaires incluent la fiabilité de l'automatisation et le coût des conséquences d'une décision ou d'une action erronée.[4]

**(analyse de l'auteur)** Concrètement, on peut automatiser très haut l'**acquisition** de données (capteurs, relevés) sans grand risque, plus prudemment l'**analyse** (alertes, tendances), et garder une validation humaine pour la **sélection de la décision** quand le coût d'une erreur est élevé.

## 4. Le piège : les ironies de l'automatisation

Bainbridge (1983) montre que l'automatisation de processus industriels peut aggraver plutôt qu'éliminer les problèmes liés à l'opérateur.[5] Elle observe que l'opérateur d'un système automatisé doit surveiller son bon fonctionnement et, en cas de défaut, appeler un opérateur plus expérimenté ou reprendre la main.[5] Reprendre le contrôle exige des compétences manuelles, et diagnostiquer la panne des compétences cognitives.[5] Une « ironie plus sérieuse » : le système automatique a été installé parce qu'il fait mieux que l'opérateur, mais on demande à ce dernier de vérifier qu'il fonctionne correctement.[5] Pour les événements rares à détecter rapidement, l'opérateur doit recevoir une assistance artificielle, si nécessaire jusqu'à des « alarmes sur les alarmes ».[5]

**(analyse de l'auteur)** Conséquences de conception :
- ne pas réduire un poste à de la simple surveillance ;
- conserver et entraîner volontairement les compétences de reprise en main ;
- concevoir des alarmes qui aident à détecter les événements rares, sans noyer l'opérateur.

## 5. Où l'automatisation se branche : couches et frontières

Le modèle ISA-95 (IEC 62264) organise les systèmes en niveaux : processus physiques (0), capteurs et actionneurs (1), supervision et contrôle comme les automates et DCS (2), gestion des opérations de fabrication comme MES et SCADA (3), planification et logistique de l'entreprise comme l'ERP (4).[6] La norme traite principalement l'interface entre les niveaux 3 et 4.[6]

**(analyse de l'auteur)** Pour l'automatisation de processus, la règle utile est de **savoir à quel niveau on agit**. Une automatisation de niveau 3 ou 4 (planification, ordres de travail, rapports) a un risque très différent d'une modification de niveau 1 ou 2 (commande de machine), qui touche directement l'exécution physique.

## 6. Sécurité : une frontière à ne pas franchir à la légère

La norme ISO 13849-1 fournit des exigences et des conseils sur les principes de conception et d'intégration des parties de systèmes de commande relatives à la sécurité (SRP/CS), y compris le logiciel, et fournit une méthodologie qui inclut la notion de niveau de performance requis (PLr).[7] Je n'ai pu consulter que le résumé officiel ; le texte intégral est payant.[7] Elle ne précise pas quelles fonctions de sécurité ni quels niveaux de performance utiliser dans un cas donné.[7]

**(analyse de l'auteur)** Ce que j'en retiens pour un projet d'automatisation :
- toute fonction de sécurité relève d'une analyse de risques formelle et de personnes compétentes, jamais d'un projet d'amélioration continue improvisé ;
- une automatisation ajoutée ne doit pas dégrader ni contourner une fonction de sécurité existante ;
- un assistant IA ne doit pas être placé dans la chaîne de sécurité (voir le white paper sur les copilotes industriels).

Ce document n'est pas une analyse de conformité : l'application des normes de sécurité machine à un cas réel doit être confiée à un spécialiste.

## 7. Méthode proposée : cinq étapes

**(analyse de l'auteur)**

1. **Observer** le processus réel (gemba), mesurer le temps, la variabilité, les arrêts, les reprises.
2. **Standardiser et simplifier** : supprimer les gaspillages avant d'automatiser.
3. **Détecter** : instrumenter les anomalies, avec arrêt ou alerte (jidoka).
4. **Classer la candidate à l'automatisation** selon les quatre classes de fonctions et le coût d'une erreur, et choisir le niveau d'automatisation le plus bas qui apporte le gain voulu.
5. **Déployer en petit, mesurer, garder une reprise manuelle** : pilote sur un poste, indicateurs avant/après, procédure de repli, formation à la reprise.

## 8. Critères de décision

**(analyse de l'auteur)** Un processus est un bon candidat si : il est **stable et standardisé**, répétitif, à forte fréquence, mesurable, et si une erreur est **peu coûteuse et réversible**. À l'inverse, il vaut mieux attendre ou garder l'humain dans la boucle si le processus varie beaucoup, si l'erreur est coûteuse ou irréversible, ou si l'on ne sait pas encore mesurer le résultat.

## 9. Indicateurs

**(analyse de l'auteur)** Pour ne pas juger sur l'impression :
- temps de cycle et variabilité avant/après ;
- taux de reprise manuelle et de défauts ;
- nombre d'arrêts sur anomalie, et temps de reprise ;
- charge cognitive et retours des opérateurs ;
- gains nets, une fois le coût de maintenance de l'automatisation déduit.

## 10. Limites de ce document

- Il s'appuie sur des textes généraux et classiques, sans cas industriel mesuré.
- Les sources 1 à 3 décrivent le Toyota Production System ; leur transposition à d'autres contextes est une interprétation.
- La méthode en cinq étapes et les critères sont des propositions de l'auteur, non un standard.
- Les normes de sécurité machine ne sont pas analysées ici ; leur texte intégral, payant, n'a pas été consulté.
- Bainbridge date de 1983 ; ses conclusions sont reprises ici comme cadre de réflexion et non comme mesure actuelle.

## 11. Conclusion

**(analyse de l'auteur)** Automatiser bien, c'est d'abord **comprendre et stabiliser**, puis **détecter les anomalies**, puis **automatiser le niveau le plus bas utile**, en gardant l'opérateur capable de reprendre la main. L'objectif n'est pas de supprimer l'humain mais de lui donner un système qui l'alerte vite et ne le laisse pas démuni.

---

## Sources

1. Lean Enterprise Institute, *Jidoka* – https://www.lean.org/lexicon-terms/jidoka/
2. Toyota, *Toyota Production System* – https://global.toyota/en/company/plant-tours/production-system/
3. Art Byrne, *Ask Art: Is there a balance between lean and full automation?*, The Lean Post, Lean Enterprise Institute – https://www.lean.org/the-lean-post/articles/ask-art-is-there-a-balance-between-lean-and-full-automation/
4. Parasuraman, Sheridan, Wickens, *A model for types and levels of human interaction with automation*, IEEE Trans. SMC-A, 2000 (volume et pages non vérifiés dans cette version) – https://doi.org/10.1109/3468.844354
5. Bainbridge, *Ironies of Automation*, Automatica 19(6), 1983 – https://doi.org/10.1016/0005-1098(83)90046-8 ; texte : https://ckrybus.com/static/papers/Bainbridge_1983_Automatica.pdf
6. ISA, *ISA-95 Series of Standards* – https://www.isa.org/standards-and-publications/isa-standards/isa-95-standard
7. ISO 13849-1:2023 – https://www.iso.org/standard/73481.html
