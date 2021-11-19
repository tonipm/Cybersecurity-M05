<!--
---
title: "Tècniques d'encriptació de les xarxes sense fils"
author: "Toni Peraira"
date: "2021-11-19"
version: "1.0"
geometry: left=2.54cm,right=2.54cm,top=2.54cm,bottom=2.54cm
header-right: '\headerlogo'
header-includes:
- '`\newcommand{\headerlogo}{\raisebox{0pt}[0pt]{\includegraphics[width=3cm]{../institut_montilivi.png}}}`{=latex}'
---
pandoc README.md -o Toni_Peraira_RA2_2.2.pdf --from markdown --template eisvogel --listings --pdf-engine=xelatex
-->

# Descriu les tècniques d'encriptació de les xarxes sense fils i els seus punts vulnerables <!-- omit in toc -->

# Índex <!-- omit in toc -->

- [Configuració Router](#configuració-router)
- [Executa una instrucció i envia el resultat d'aquesta a una altre instrucció.](#executa-una-instrucció-i-envia-el-resultat-daquesta-a-una-altre-instrucció)
- [Configura el router per tal que faci servir un passsword tipus WEP.](#configura-el-router-per-tal-que-faci-servir-un-passsword-tipus-wep)
- [Configura el router per tal que faci servir un password tipus WPA.](#configura-el-router-per-tal-que-faci-servir-un-password-tipus-wpa)
- [Configura el router per tal que faci servir un password tipus WPA2.](#configura-el-router-per-tal-que-faci-servir-un-password-tipus-wpa2)
- [Configura la targeta wifi per tal que estigui en mode monitor.](#configura-la-targeta-wifi-per-tal-que-estigui-en-mode-monitor)

## Configuració Router

![](images/image5.png "Configuració router 1")

![](images/image3.png "Configuració router 2")

![](images/image8.png "Configuració router 3")

![](images/image1.png "Configuració router 4")

![](images/image4.png "Configuració router 5")

![](images/martinrouterking_ok.jpeg "Configuració router acabada")

**Aquests són els sistemes de xifrat que permet utilitzar el router**

!["Configuració Wi-Fi"](images/image7.png "Configuració Wi-Fi")

Segons la pàgina del fabricant sobre aquest model:

WPA2 Personal, WPA2 Enterprise

![https://www.linksys.com/es/wireless-routers/wrt-wireless-routers/linksys-wrt3200acm-ac3200-mu-mimo-gigabit-wifi-router/p/p-wrt3200acm/](images/image2.png)

## Executa una instrucció i envia el resultat d'aquesta a una altre instrucció.

Llistar els fitxers i directoris i els ordenem aleatòriament.

```console
ls -1 | sort -R
```

Per l'anterior pràctica també vam fer alguns exemples com el següent, que llista les interfícies de xarxa i es filtra la sortida amb *awk*:

```
ip -o link show | awk -F': ' '{print $2}'
```


## Configura el router per tal que faci servir un passsword tipus WEP.

El sistema de xifrat WEP (Wired Equivalent Privacy) ja està obsolet perquè és fàcil de desxifrar. Per tant, aquest router no es pot configurar per fer servir aquest tipus d'encriptació. Dels xifrats que es demanen en aquesta pràctica, és el més dèbil.

En resum, no és segur fer-ho servir.

## Configura el router per tal que faci servir un password tipus WPA.

Igual que passa amb el WEP, aquest router tampoc ens permet configurar un password amb WPA, ja que es considera dèbil i ja es pot desxifrar sense gaire dificultat. Tot i que és més segur que el WEP, no és suficient.

## Configura el router per tal que faci servir un password tipus WPA2.

Per defecte ja tenim configurat el password amb WPA2, perquè només ens permet configurar una WPA2 Personal o WPA2 Enterprise.

!["Configuració Wi-Fi"](images/image7.png "Configuració Wi-Fi")

Segons https://www.tp-link.com/es/support/faq/500/:

**WPA-Personal (WPA-PSK):** Aquest mode és adequat per a les xarxes domèstiques. Els usuaris que es connecten a la xarax ho fan a partir d'una contrasenya o punt d'accés (AP).

**WPA-Enterprise (WPA-802.1x, RADIUS):** Aquest mode està més pensat per a les xarxes sense fil en entorns no domèstics. Ofereix un control individual pels usuaris que es connecten. Quan els usuaris intenten connectar-se a la xarxa, ho han de fer amb unes credencials de sessió.

## Configura la targeta wifi per tal que estigui en mode monitor.

Per l'anterior pràctica ja vaig configurar la targeta per treballar en mode monitor.


Fem una prova amb aircrak-ng per monitorar:

```
sudo airmon-ng start wlp14s0
```
!["airmon-ng start wlp14s0"](../RA2_2.1/images/image02.png "airmon-ng start wlp14s0")

```
sudo airmon-ng check kill
sudo airodump-ng wlp14s0mon
```

!["Monitoratge on es veu la meva nova xarxa"](images/martinrouterking.png "airodump-ng wlp14s0mon")