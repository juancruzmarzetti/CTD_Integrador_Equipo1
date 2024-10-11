# Deploy Vercel (React, Vite) + Railway (Java, Spring)

Este es un fork específicamente hecho para el deploy gratuito del Front-End y Back-End del proyecto original (proyecto final de la Carrera Certified Tech Developer de Digital House). La idea principal era hacer el deploy en AWS lo cual fue logrado, pero no de manera gratuita (por lo que lo bajamos y dejamos esta infraestructura hasta poder hacer gratuita la infraestructura en AWS).

Esta infraestructura está automatizada con Vercel y Railway. En Vercel está hecho con un template de Vite y en Railway con una instancia de Base de Datos de PostgreSQL y otra instancia que hace el deploy del Back-End (lo único personalizado es en el deploy del Back-End con Railway el Dockerfile, ya que la ejecución por default no soportaba Java 21 (/SkyShop/Dockerfile)).

## Infraestructura real usada en deploy con AWS automatizando la infraestructura con Terraform (IaC): [juancruzmarzetti/full-aws-iac](https://github.com/juancruzmarzetti/full-aws-iac)

### English

This is a fork specifically made for the free deployment of the Front-End and Back-End of the original project (the final project of the Certified Tech Developer program of Digital House). The main idea was to deploy on AWS, which was achieved, but not for free (so we took it down and left this infrastructure until we can make the AWS infrastructure free).

This infrastructure is automated with Vercel and Railway. In Vercel, it’s built with a Vite template, and in Railway, there’s a PostgreSQL Database instance and another instance that deploys the Back-End (the only customization is in the Back-End deployment on Railway, where the Dockerfile was adjusted, as the default execution did not support Java 21 (/SkyShop/Dockerfile)).

## Actual infrastructure used in deploy with AWS automating the infrastructure with Terraform (IaC): [juancruzmarzetti/full-aws-iac](https://github.com/juancruzmarzetti/full-aws-iac)
