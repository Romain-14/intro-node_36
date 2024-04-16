// ici le système de fichier est un peu différent, on est dans un serveur node
// c'est du CommonJS
// utilisation d'un module interne de node pour créer un serveur
// stocké dans une constante
const http = require("http");
const fs = require("fs");

// utilisation de cet objet pour mettre en place le serveur
// dans une communication client -> serveur, il y a un cycle de requête - réponse
// requête = demande du client
// réponse = réponse du serveur
// on utilise la méthode createServer sur l'objet http 
// va prendre une callback en paramètre qui va écouter les requêtes du client
http.createServer((request, response) => {
    // on peut se servir de ces paramètres pour personnaliser la réponse
    // dés lors qu'une demande sera effectué on rentrera dans ce bloc de code
    // la demande s'initie quand l'utilisateur clique sur un lien ou tape une url dans la barre de recherche
    // la propriété url est disponible sur l'objet request
    // on va s'en servir pour personnaliser la réponse
    console.log(request.url);
    if(request.url === "/") { // si l'url est la racine ici -> http://localhost:9000
        // on va envoyer une h1 indiquant la page d'accueil
        // dans toutes réponses envoyées au client, il faut envoyer des informations précises
        // ça permet au navigateur d'indiquer le type de contenu qu'il reçoit et comment l'afficher
        // ici un statut(code http) 200 = OK et le type de contenu est du texte html
        response.writeHead(200, {"Content-Type": "text/html"});// ici l'écriture de métadonnées dans l'entête de la réponse
        // response.write("<h1>Accueil</h1>"); // écriture du contenu de la réponse
        // response.end(); // fin de la réponse évite que la page charge dans le vide
        response.write(`
            <head>
                <link rel="stylesheet" href="style.css">
                <title>Accueil</title>
            </head>
            <body>

                <header>
                    <nav>
                           <a href="/">Accueil</a>
                           <a href="/blog">Blog</a>
                    </nav>
                </header>
                <main>
                    <h1>Accueil</h1>
                </main>

            </body>
        `);

        response.end();
    };

    if(request.url === "/blog") {// si l'url se termine par /blog ici -> http://localhost:9000/blog
        // comme le if ci-dessus, on envoie une h1 indiquant la page blog
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(`
            <head>
                <title>Accueil</title>
            </head>
            <body>

                <header>
                    <nav>
                           <a href="/">Accueil</a>
                           <a href="/blog">Blog</a>
                    </nav>
                </header>
                <main>
                    <h1>Blog</h1>
                </main>

            </body>
        `);
        response.end();
    };
    if(request.url === "/style.css"){
        fs.readFile("style.css", (error, data) => {
            console.log(data); // données "buffer"
            console.log(data.toString()); // données en string pour le rendre compréhensible dans la console

            if(error) {
                response.writeHead(404, {"Content-Type": "text/html"});
                response.write("<h1>404 Not Found</h1>");
                response.end();
            } else {
                response.writeHead(200, {"Content-Type": "text/css"});
                response.write(data); // pas besoin de convertir en string car c'est déjà du texte css
                response.end();
            }
        });
    }
   

}).listen(9000, () => console.log("Server is running at http://localhost:9000"));
// la méthode listen permet de démarrer le serveur sur le port fournit en 1er paramètre
// le second permets d'avoir un retour ici dans la console
// EN NODE LA CONSOLE EST LE TERMINAL LOCAL