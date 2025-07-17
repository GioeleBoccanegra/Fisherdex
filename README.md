
# Fisherdex 🐟

Fisherdex è un'applicazione web che permette agli utenti di registrare, condividere e visualizzare catture di pesci in un formato simile al "Pokédex". È pensata per gli appassionati di pesca sportiva che vogliono tenere traccia delle proprie catture, esplorare specie e scoprire le zone migliori.

## 🚀 Tecnologie utilizzate

### Frontend
- **React** + **Vite**
- **Redux Toolkit** per lo stato globale
- **React Router DOM** per la navigazione
- **Tailwind CSS** per lo styling
- **Netlify** per il deploy

### Backend
- **Spring Boot** (Java)
- **Spring Security + JWT** per autenticazione
- **JPA/Hibernate** per la gestione del database
- **MySQL** come database relazionale per lo sviluppo locale
- **PostgreSQL** come database relazionale per il deploy
- **Heroku** per il deploy del backend

---

## ⚙️ Funzionalità principali

### ✅ Utente
- Registrazione e login
- Salvataggio token JWT
- Modifica dati utente (es. provincia, email, ecc.)

### 🎣 Catture
- Upload di una nuova cattura (immagine, descrizione, data, posizione, specie)
- Visualizzazione delle catture proprie e degli altri utenti
- Cancellazione catture

### 🐠 Fisherdex
- Lista delle specie esistenti
- Evidenziazione di quelle già catturate
- Dettagli su ogni specie



## 🌐 Deploy

- **Frontend**: [https://fisherdex.netlify.app](https://fisherdex.netlify.app)
- **Backend**: [https://fisherdex-backend1-...herokuapp.com](https://fisherdex-backend1-...herokuapp.com)

---

## 📥 Installazione locale

### Frontend

```bash
cd frontend
npm install
npm run dev
````

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

Assicurati di configurare il file `application.properties` con le credenziali del database.

---

## 🛠️ Da aggiungere (To-do)

* [ ] ✅ Verifica email dopo la registrazione
* [ ] 🐟 Gestione **pluri-catture** della stessa specie (con statistica)
* [ ] 📍 Verifica posizione cattura (via geolocalizzazione)
* [ ] 🖼️ Modifica della foto profilo utente
* [ ] 📊 Statistiche utente più dettagliate

---

## 🙌 Autore

Progetto realizzato da **Gioele Boccanegra** come parte di un percorso di sviluppo web e mobile.

---

## 📄 Licenza

Questo progetto è rilasciato sotto licenza **MIT**.

```

