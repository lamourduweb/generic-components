##  Comment ajouter de nouveaux components dans mon theme shopify ?
**1/ Ajouter une section ou un snippet**
<details>
<summary>
1.a Ajouter une section sur le thème
</summary>
  
- Dans le dossier sections de votre thème
  
- Créer un nouveau fichier en nommant bien votre section
  
- Copier-coller le code figurant dans le fichier du repository github vers votre nouveau fichier dans thème Shopify.

**Help !**
Je veux ajouter des réassurances sur le thème !

- Copier le code concernant les reassurances se trouvant dans fichier 'config/settings_schema.json' sur le repository Git.

- Coller le code dans le fichier 'config/settings_schema.json' de votre boutique.

- Créer le fichier 'sections/reinsurances.liquid' et copier-coller le code se trouvant dans le même fichier sur le repository Git.


Pour que la section se retrouve au dessus du footer sur toutes les pages :

- Ouvrez le fichier 'layout/theme.liquid'

- Reperer le code '{% section 'footer' %}'

- Ajouter de la même manière votre section juste au dessus du footer !
  
  ```
  {% section 'reinsurances' %}
  ```

</details>

<details>
<summary>
1.b Ajouter un snippet sur le thème
</summary>
  
- Dans le dossier snippets de votre thème
  
- Créer un nouveau fichier en nommant bien votre snippet
  
- Copier-coller le code figurant dans le fichier du repository github vers votre nouveau fichier dans thème Shopify.

- Enfin ajouter votre snippet dans un fichier.liquid
Ex: On veut ajouter le breadcrumb sur la fiche produit
on ouvre le fichier en question 'sections/main-product.liquid'
et on colle le code dans le fichier à l'emplacement souhaité
  
```
{% render 'breadcrumb' %}
```

</details>


**2/ Ajouter les styles et les traductions sur le thème**

<details>
<summary>
2.a. Ajouter le fichier CSS associé à votre section ou snippet sur le thème
</summary>
  
Si EN HAUT de votre fichier.liquid vous avez l'appel d'un fichier.css du genre:
  
```
{{ 'section-name.css' | asset_url | stylesheet_tag }}
```
  
- Créer un nouveau fichier.css avec le même intitulé 'section-name.css' dans le dossier '/assets/'
  
- Copier-coller le code figurant dans le fichier du repository github vers votre nouveau fichier dans thème Shopify.
</details>
<details>
<summary>
2.b. Ajouter la traduction des champs de la section ou snippet sur le thème
</summary>

- Ouvrez le fichier 'locales/fr.schema.json'
  
- Copier-coller le code correspondant au nom de votre section ou snippet dans le fichier du repository github vers votre nouveau fichier dans thème Shopify.
</details>
