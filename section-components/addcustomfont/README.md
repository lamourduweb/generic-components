**TUTO pour ajouter des font personnalisés via la personnalisation du thème shopify**

1/ Ajouter les champs personnalisés dans le fichier 'config/settings_schema.json'
>> Aller dans le fichier en question pour voir le code.

2/ Ajouter les traduction des champs personnalisés dans le fichier 'locales/fr.schema.json'
>> Aller dans le fichier en question pour voir le code.

3/ Créer le fichier 'snippets/custom-fonts.liquid'
>>Ce fichier définir les règles créer le @font-face et reecrire un :root avec les variables réécrite pour appeler les fontes à partir des url des fontes chargés en mode personnalisation du thème

>> Aller dans le fichier en question pour voir le code.

4/ ajouter 2 nouvelle variables dans le fichier 'assets/base.css'
>> Aller dans le fichier en question pour voir le code.

5/ ajouter le snippet dans le <head> du theme 'layout/theme.liquid'
>> Aller dans le fichier en question pour voir le code.

6/ Le code est en place, reste plus qu'à ajouter les fichier fonts sur la boutique !
>> Ajouter les fichier (en format : ttf, otf, woff ou woff2) dans Shopify files > [site pour convertir les fonts](https://transfonter.org/)
>> 
>> Appuyer sur le bouton 'Copier le lien' et copier l'url du fichier dans le champs 'URL des fichiers de police' dans la personnalisation de la typo du thème.
