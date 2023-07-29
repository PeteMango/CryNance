# CryNance

## Team Members:
Thomas Wang, Sophia Sun, Jacob Zhou, Norman Chen and Peter Wang

## Short Description: 

CryNance leverages decentralized blockchains to empower authors to publish articles securely. Using Worldcoin's World ID protocol, users register with a digital identity via privacy-preserving cryptographics. Data security is guaranteed by web3 decentralized Polybase.

## Description: 

Crynance aims to provide a decentralized crypto finance news site where creators and consumers can control their experience. Using Worldcoin’s verification services, signup involves no personal information provided. By implementing decentralized technologies, Crynance looks to solve the problems of privacy and invasive advertisements on social platforms whilst also aiming to remove spam, bots and false news. 


When users log in they can explore any crypto finance article posted. Although not fully implemented, articles can be marked by creators to require certain subscription levels where readers are required to subscribe to the creator to read. In this way, users can directly support creators using Worldcon where 100% of the subscription money goes to the creators, tackling the problem of platform fees inhibiting creators. To ensure creators are reputable before subscribing, we have a reputation algorithm calculated with the creator's Worldcon account verification method (higher reputation for orb verified than phone verified) and the creator’s post upvotes so people].

By embracing decentralization, our platform tackles crucial world problems. It provides a censorship-resistant environment where journalists and authors can freely express their ideas without fear of centralized control. Moreover, it empowers content creators by offering direct monetization opportunities through paid access, eliminating the need for intermediaries and ensuring fair compensation. Through our project, we aim to foster a decentralized ecosystem that encourages the free flow of information and supports independent journalism and writing.

## How it's made:

Our frontend of the application was created using ReactJS, a modern front-end web development framework. This allowed us to leverage libraries such as Worldcoin’s IDkit and create reusable components for news articles. To style our components we used tailwindcss for rapid development while still keeping our components customizable.

For the backend, we chose to use ExpressJS as it is a javascript-based backend framework, allowing us easily implement Worldcoin’s javascript-based IDKit. As well ExpressJS gives us flexibility coupled with performance, something we were looking for to help implement the IDKit. We implemented REST API to connect the backend to the frontend. 

To address data security and privacy issues, we chose to use Polybase as our database. Polybase would allow us to use a relational decentralized database that is based on zero-knowledge proofs. This ensures that user data is stored in a distributed manner that is uncontrolled by our platform, private and secured.

For our Worldcon user authorization, we implemented the IDKit, allowing us to create a login feature that also returns the user credential type and maps the user to their respective account located in Polybase.

