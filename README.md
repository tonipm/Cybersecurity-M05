## Investiga el paquet aircrack-ng

Aircrack-ng és la suite per excel·lència de seguretat de xarxes WiFi, permetent **monitorar, atacar, crackejar i testejar** aquestes. 
Concretament aircrack-ng tal com es defineix a la seva web, és un programa crackejador de claus 802.11 WEP i WPA/WPA2-PSK.

Amb aquesta suite podem capturar paquets per fer-los servir per exemple per fer atacs de repetició, desautenticació com ja hem fet a classe, punts d'accés falsos, entre altres. 

Un cop tenim suficients paquets capturats encriptats amb airodump-ng, aircrack-ng ja és capaç de recuperar la clau WEP, combinant atacs amb força bruta.
Per altra banda, per desxifrar les WPA/WPA2-PSK que són més segures ens hem d'ajudar d'un diccionari.

La suite funciona amb línia de comandes permetent una màxima "scriptació". Tot i estar pensada per treballar amb Linux, podem fer-la en altres sistemes operatius.

A la suite podem trobar les següents eines:

- airbase-ng – Configurar punts d'accés falsos.
- aircrack-ng – El crackejador de contrasenyes i l'eina que dóna nom a la suite.
- airdecap-ng – Desencriptar arxius de paquets WEP i WPA/WPA2-PSK.
- airdecloak-ng – Esborrar el *wep cloaking* de arxius pcap, arxius amb les dades dels paquets.
- airdriver-ng – Proporciona informació dels drivers de xarxa del sistema.
- aireplay-ng – Generador de trànsit per l'ús amb altres eines.
- airmon-ng – Habilitar el mode monitor de les interfícies de xarxa, cosa que ens permet esnifar les xarxes.
- airodump-ng – Capturar paquets sense format de les xarxes WiFi.
- airodump-ng-oui-update – Actualitzar la llista IEE OUI.
- airolib-ng – Emmagatzemar i administrar la llista de contrasenyes i ESSID (identificació de cada xarxa).
- airserv-ng – Un servidor de targetes sense fil.
- airtun-ng – Creador d'interfícies de túnel virtuals.
- besside-ng – Craqueja automàticament xarxes WEP i WPA.
- besside-ng-crawler – Filtra fotogrames EAPOL d'un directori d'arxius capturats.
- buddy-ng – Una eina per treballar amb easside-ng.
- easside-ng – Una eina de màgia automàtica que permet la comunicació mitjançant un punt d'accés xifrat amb WEP.
- ivstools – Aquesta eina gestiona fitxers .ivs per combinar-los o convertir-los.
- kstats – Mostra estadístiques de l'algoritme FMS per bolcatges ivs i una clau WEP especificada. 
- makeivs-ng – Genera vectors d'inicialització.
- packetforge-ng – Crear paquets xifrats que es poden utilitzar posteriorment en injeccions.
- tkiptun-ng – Aquesta eina és capaç d'injectar uns quants fotogrames a una xarxa WPA TKIP amb QoS.
- wesside-ng – Eina automàtica que incorpora una sèrie de tècniques per obtenir una clau WEP sense problemes.
- wpaclean – Eliminar l'excés de dades d'un arxius pcap.