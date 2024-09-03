Documentation de l'API REST de _Note App_.

Bienvenue dans la documentation de l'API REST pour l'application _Note App_. Cette documentation fournit des informations sur les différentes fonctionnalités disponibles.

## Créer une Application

URL : /app

Méthode : POST

Contraintes de données

Fournissez le nom de l'application à créer.

json
{
"name": "[string]"
}

_Exemple de données_

json
{
"name": "Ma Super Application"
}

### Succès de la réponse

_Condition_ : Si tout est OK.

_Code_ : 201 CREATED

_Exemple de contenu_

json
{
"success": true,
"message": "App created successfully. AppId: sq89lzi",
}

_NB_ : Cet identifiant _AppId_ sera utilisé partout ou on vous demande AppId.

### Réponses d'erreur

_Condition_ : Si des champs sont manquants ou incorrects.

_Code_ : 400 BAD REQUEST

_Exemple de contenu_

json
{
"message": "Validation failed",
"errors": [
{
"field": "name",
"message": "The name is required."
}
]
}

## Opérations sur les Notes

Effectuez diverses opérations sur les notes associées à une application spécifique.

_URL_ : /app/:appid/notes

## Obtenir toutes les Notes

_Méthode_ : GET

### Succès de la réponse

_Condition_ : Si tout est OK.

_Code_ : 200 OK

_Exemple de contenu_

json
[
{
"id": "identifiant_unique",
"title": "Note existante",
"text": "Contenu de la note",
"createdAt": "horodatage",
"updatedAt": "horodatage",
"isFavorite": false
}
]

### Réponses d'erreur

_Condition_ : Si une erreur inattendue se produit.

_Code_ : 500 INTERNAL SERVER ERROR

_Exemple de contenu_

json
{
"message": "Une erreur inattendue s'est produite",
"cause": "Détails de l'erreur"
}

## Créer une Note

_Méthode_ : POST

_Contraintes de données_

Fournissez le titre et le texte de la note à créer.

json
{
"title": "[string]",
"text": "[string]"
}

_Exemple de contenu_

json
{
"title": "Nouvelle Note",
"text": "Contenu de la note"
}

### Succès de la réponse

_Condition_ : Si tout est OK.

_Code_ : 201 CREATED

_Exemple de contenu_

json
{
"id": "identifiant_unique",
"title": "Nouvelle Note",
"text": "Contenu de la note",
"createdAt": "horodatage",
"updatedAt": "horodatage",
"isFavorite": false
}

### Réponses d'erreur

_Condition_ : Si des champs sont manquants ou incorrects.

_Code_ : 400 BAD REQUEST

_Exemple de contenu_

json
{
"message": "Validation échouée",
"errors": [
{
"field": "title",
"message": "Le titre est requis."
}
]
}

## Mettre à jour une Note

_URL_ : /app/:appid/notes/:id

_Méthode_ : PATCH

_Contraintes de données_

Fournissez le titre et/ou le texte mis à jour de la note.

json
{
"title": "[string]",
"text": "[string]"
}

_Exemple de données_

json
{
"title": "Nouveau Titre",
"text": "Nouveau Contenu de la note"
}

### Succès de la réponse

_Condition_ : Si tout est OK.

_Code_ : 200 OK

_Exemple de contenu_

json
{
"id": "identifiant_unique",
"title": "Nouveau Titre",
"text": "Nouveau Contenu de la note",
"createdAt": "horodatage",
"updatedAt": "horodatage",
"isFavorite": false
}

### Réponses d'erreur

_Condition_ : Si des champs sont manquants ou incorrects.

_Code_ : 400 BAD REQUEST

_Exemple de contenu_

json
{
"message": "Validation échouée",
"errors": [
{
"field": "title",
"message": "Le titre est requis."
}
]
}

_Condition_ : Si la note spécifiée n'existe pas.

_Code_ : 404 NOT FOUND

_Exemple de contenu_

json
{
"status": 404,
"reason": "Note non trouvée"
}

_Condition_ : Si une erreur inattendue se produit.

_Code_ : 500 INTERNAL SERVER ERROR

_Exemple de contenu_

json
{
"message": "Une erreur inattendue s'est produite",
"cause": "Détails de l'erreur"
}

## Basculer l'état Favori de la Note

_URL_ : /app/:appid/notes/:id/toggle-favorite

_Méthode_ : POST

### Succès de la réponse

_Condition_ : Si tout est OK.

_Code_ : 200 OK

_Exemple de contenu_

json
{
"id": "identifiant_unique",
"title": "Titre de la note",
"text": "Contenu de la note",
"createdAt": "horodatage",
"updatedAt": "horodatage",
"isFavorite": true
}

### Réponses d'erreur

_Condition_ : Si la note spécifiée n'existe pas.

_Code_ : 404 NOT FOUND

_Exemple de contenu_

json
{
"status": 404,
"reason": "Note non trouvée"
}

_Condition_ : Si une erreur inattendue se produit.

_Code_ : 500 INTERNAL SERVER ERROR

_Exemple de contenu_

json
{
"message": "Une erreur inattendue s'est produite",
"cause": "Détails de l'erreur"
}

## Supprimer une Note

_URL_ : /app/:appid/notes/:id

_Méthode_ : DELETE

### Succès de la réponse

_Condition_ : Si tout est OK.

_Code_ : 204 NO CONTENT

_Remarque_ : Aucun contenu n'est renvoyé en cas de succès, seulement le code de statut.

### Réponses d'erreur

_Condition_ : Si la note spécifiée n'existe pas.

_Code_ : 404 NOT FOUND

_Exemple de contenu_

json
{
"status": 404,
"reason": "Note non trouvée"
}

_Condition_ : Si une erreur inattendue se produit.

_Code_ : 500 INTERNAL SERVER ERROR

_Exemple de contenu_

json
{
"message": "Une erreur inattendue s'est produite",
"cause": "Détails de l'erreur"
}
