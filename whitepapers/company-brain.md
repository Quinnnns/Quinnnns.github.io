# Company brain : la connaissance de l'entreprise comme infrastructure
### Capitaliser, structurer et interroger le savoir d'une organisation avec RAG et graphes de connaissances

*Auteur : Quentin Bourgois – Version 0.1 (brouillon) – Document de recherche et de réflexion. Il ne décrit aucun résultat mesuré sur un système en production.*

> **Convention de lecture.** Les affirmations suivies de [n] sont appuyées par une source listée en fin de document. Les passages marqués **(analyse de l'auteur)** sont des positions argumentées, non des faits sourcés.

---

## 1. Contexte et question

Dans une usine ou un bureau d'études, le savoir utile est dispersé : procédures, gammes, retours d'expérience, comptes rendus de pannes, décisions de projet, échanges de messagerie, et surtout ce que savent les personnes. Un « company brain » désigne ici un système qui rend ce savoir **retrouvable, vérifiable et interrogeable en langage naturel**, souvent avec un LLM.

La question de ce document : **comment bâtir un tel système sans produire un oracle qui répond avec assurance à partir de données périmées, non autorisées ou mal comprises ?**

## 2. Le savoir est d'abord un sujet d'organisation, pas d'outil

La norme ISO 30401 fixe des exigences pour établir, mettre en œuvre, maintenir, revoir et améliorer un système de management de la connaissance, applicable à tout type et toute taille d'organisation.[1] La norme est en cours de révision : une édition 2 (projet ISO/DIS 30401) est en développement.[1] Je n'ai pas pu consulter le texte de la norme, qui est payant, et ne détaille donc pas son plan ici.

**(analyse de l'auteur)** Le message pratique : un moteur de questions-réponses ne remplace ni un propriétaire par domaine de connaissance, ni un cycle de mise à jour, ni une règle de retrait des documents obsolètes. Sans eux, l'IA ne fait qu'accélérer l'accès à un contenu de qualité inconnue.

## 3. Pourquoi RAG plutôt que le seul modèle

Les LLM rencontrent des difficultés d'hallucination, de connaissances périmées et de raisonnement opaque et non traçable ; le RAG (génération augmentée par récupération) est présenté comme une solution prometteuse en incorporant des connaissances issues de bases externes, ce qui permet des mises à jour continues et l'intégration d'informations propres à un domaine.[2] L'article fondateur du RAG note que la provenance des décisions et la mise à jour des connaissances étaient des problèmes ouverts pour les modèles purement paramétriques.[3]

La littérature distingue trois paradigmes : RAG naïf, avancé et modulaire.[2]

**(analyse de l'auteur)** Pour une entreprise, l'argument décisif n'est pas la performance brute mais le fait que le savoir reste **dans vos documents, modifiable et auditable**, plutôt que figé dans les poids d'un modèle.

## 4. Limites du RAG simple

**4.1 Les questions globales.** Un travail de Microsoft Research indique que le RAG vectoriel classique échoue sur les questions portant sur un corpus entier (par exemple « quels sont les grands thèmes ? »), car il s'agit d'une tâche de résumé orienté par la requête et non de récupération explicite.[4]

**4.2 Le contexte long n'est pas utilisé uniformément.** Les auteurs de *Lost in the Middle* observent que les performances peuvent chuter nettement quand l'information pertinente se trouve au milieu d'un long contexte, les meilleurs résultats étant obtenus quand elle est au début ou à la fin.[5] Ils notent que cela vaut même pour des modèles conçus pour de longs contextes.[5]

**(analyse de l'auteur)** Conséquence de conception : récupérer peu de passages, mais bien choisis et classés, vaut mieux que « tout envoyer au modèle ».

## 5. Les graphes de connaissances : ce qu'ils apportent

GraphRAG construit avec un LLM un graphe d'entités à partir des documents, puis pré-génère des résumés pour les communautés d'entités proches ; une question reçoit des réponses partielles issues de ces résumés, ensuite synthétisées.[4] Pour une classe de questions globales de synthèse, sur des jeux de données de l'ordre du million de jetons, les auteurs rapportent des améliorations substantielles par rapport à un RAG vectoriel de référence, en exhaustivité et en diversité des réponses.[4] L'évaluation porte sur deux jeux de données et sur GPT-4.[4] **(analyse de l'auteur)** Ces résultats ne se transposent pas automatiquement à un corpus industriel.

**(analyse de l'auteur)** Un graphe est utile là où les relations comptent : quel équipement dépend de quel fournisseur, quelle gamme utilise quelle instruction, quelle non-conformité a mené à quelle action. Il a un coût : construire et maintenir le graphe demande des appels au modèle et des contrôles.

## 6. Sécurité et droits d'accès

L'OWASP décrit un risque propre aux bases vectorielles : en environnement multi-utilisateurs, des embeddings d'un groupe peuvent être récupérés en réponse aux requêtes d'un autre groupe, avec fuite possible d'informations sensibles.[6] Ses mesures : contrôles d'accès fins, bases vectorielles « conscientes des permissions », partitionnement logique et d'accès strict des jeux de données, et classification des données dans la base de connaissances.[6] Il signale aussi les conflits entre sources qui se contredisent lors de la fédération de données.[6]

**(analyse de l'auteur)** Règle de conception : le filtrage par droits doit se faire **avant** la génération, au niveau de la récupération, et pas en demandant au modèle de « ne pas révéler » ce qu'il a déjà reçu.

## 7. Architecture de référence proposée

**(analyse de l'auteur)** Cinq couches, chacune avec un responsable :

1. **Sources** : documents, bases de données, tickets, avec propriétaire et date de validité.
2. **Ingestion** : découpage, métadonnées (auteur, version, statut, niveau d'accès), détection des doublons.
3. **Index** : vectoriel pour la recherche de passages ; graphe pour les relations et les questions globales.
4. **Récupération contrôlée** : filtrage par droits, classement, limite du nombre de passages.
5. **Réponse** : citations obligatoires, mention « je ne sais pas » si aucune source ne répond, retour utilisateur (utile / faux / périmé) renvoyé au propriétaire du document.

## 8. Évaluation

**(analyse de l'auteur)** Je propose de mesurer séparément :
- la **qualité de récupération** (le bon passage est-il trouvé ?) ;
- la **fidélité de la réponse** aux passages cités ;
- le **taux de refus approprié** lorsque l'information n'existe pas ;
- la **fraîcheur** (part des réponses s'appuyant sur des documents obsolètes) ;
- le **respect des droits d'accès**, par des tests avec des profils d'utilisateurs différents.

La gouvernance du cadre NIST AI RMF (Govern, Map, Measure, Manage) fournit un cadre volontaire pour organiser ce suivi.[7]

## 9. Limites de ce document

- Il s'appuie sur la littérature et des normes générales, sans déploiement mesuré.
- Les résultats de GraphRAG cités viennent d'une évaluation limitée à deux jeux de données.
- L'architecture de la section 7 est une proposition de l'auteur, non un standard.
- Les aspects juridiques (données personnelles, secret industriel) ne sont pas traités ici.
- ISO 30401 est en cours de révision, et son texte payant n'a pas été consulté.[1]

## 10. Conclusion

**(analyse de l'auteur)** Un company brain utile est d'abord un **système de gestion de la connaissance** (propriétaires, cycle de vie, droits) auquel on ajoute une interface d'IA, et non l'inverse. Le RAG apporte la traçabilité et la mise à jour ; le graphe apporte les relations et les vues d'ensemble ; les droits d'accès et la fraîcheur déterminent si on peut lui faire confiance.

---

## Sources

1. ISO 30401:2018, *Knowledge management systems — Requirements* – https://www.iso.org/standard/68683.html ; projet d'édition 2 : https://committee.iso.org/standard/89436.html
2. Gao et al., *Retrieval-Augmented Generation for Large Language Models: A Survey*, arXiv:2312.10997 – https://arxiv.org/html/2312.10997
3. Lewis et al., *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks*, arXiv:2005.11401 – https://arxiv.org/html/2005.11401
4. Edge et al., *From Local to Global: A GraphRAG Approach to Query-Focused Summarization*, arXiv:2404.16130 – https://arxiv.org/html/2404.16130
5. Liu et al., *Lost in the Middle: How Language Models Use Long Contexts*, arXiv:2307.03172 – https://arxiv.org/html/2307.03172
6. OWASP, *LLM08:2025 Vector and Embedding Weaknesses* – https://genai.owasp.org/llmrisk/llm08:2025-vector-and-embedding-weaknesses/
7. NIST, *AI RMF 1.0 (NIST AI 100-1)* – https://doi.org/10.6028/NIST.AI.100-1
