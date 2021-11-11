# Configura els diferents modes de funcionament de la targeta de xarxa sense fils  <!-- omit in toc -->

# Índex <!-- omit in toc -->

- [Explica què és l'estàndard IEEE 802.](#explica-què-és-lestàndard-ieee-802)
- [Llista els diferents modes de funcionament del teu adaptador wifi.](#llista-els-diferents-modes-de-funcionament-del-teu-adaptador-wifi)
- [Comprova que la teva interfície és compatible amb el paquet aircrack-ng.](#comprova-que-la-teva-interfície-és-compatible-amb-el-paquet-aircrack-ng)
- [Llista les targetes de xarxa (ip link) - explica què hi veus.](#llista-les-targetes-de-xarxa-ip-link---explica-què-hi-veus)
- [Llista les targetes de xarxa (nmcli) - explica què hi veus.](#llista-les-targetes-de-xarxa-nmcli---explica-què-hi-veus)
- [Llista les targetes de xarxa d'una altre forma diferent però en aquest cas només s'han de veure els noms de les targetes de xarxa com a resultat de la instrucció.](#llista-les-targetes-de-xarxa-duna-altre-forma-diferent-però-en-aquest-cas-només-shan-de-veure-els-noms-de-les-targetes-de-xarxa-com-a-resultat-de-la-instrucció)
- [Desactiva i activa una teva targeta de xarxa](#desactiva-i-activa-una-teva-targeta-de-xarxa)

## Explica què és l'estàndard IEEE 802.

La [IEEE 802](https://www.ieee802.org/) són una sèrie d'estàndards per les xarxes informàtiques, xarxes d'àrea local (LAN) i xarxes d'àrea metropolitana (MAN). 

Aquests estàndards defineixen els serveis i protocols de la capa física i la capa d'enllaç de dades del model OSI.

Entre els seus estàndards podem trobar:
* IEEE 802.3. Ethernet.
* IEEE 802.11. Xarxes sense fils Wi-Fi.
* IEEE 802.15. Wireless PAN (IrDA, Wireless USB, Bluetooth o ZigBee).

![alt_text](images/image01.png "Estructura del projecte IEEE 802")

## Llista els diferents modes de funcionament del teu adaptador wifi.

```console
iw list
```

Del resultat podem extraure els diferents modes de funcionament:
```
	Supported interface modes:
		 * IBSS
		 * managed
		 * AP
		 * AP/VLAN
		 * monitor
		 * mesh point
		 * P2P-client
		 * P2P-GO
		 * outside context of a BSS
```

## Comprova que la teva interfície és compatible amb el paquet aircrack-ng.

Per saber si la nostra interfície és compatible necessitem informació de la targeta de xarxa que fem servir. Amb la següent comanda obtenim informació detallada dels dispositius del sistema, en aquesta informació trobem la targeta de xarxa:
```console
lscpi
```

> 0e:00.0 Network controller: Qualcomm Atheros AR9462 Wireless Network Adapter (rev 01)

Dins la seva [web de compatibilitat](https://www.aircrack-ng.org/doku.php?id=compatibility_drivers_old) podem trobar la meva interfície a la llista. 

A més, hem trobat abans que la interfície suporta el mode *monitor*, mode que necessitarem per l'aircrack-ng.

Com he fet servir l'aircrack-ng altres vegades sé amb seguretat que la meva interfície és compatible.

## Llista les targetes de xarxa (ip link) - explica què hi veus.

```console
ip link
```

```
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: enp15s0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc fq_codel state DOWN mode DEFAULT group default qlen 1000
    link/ether 7c:05:07:cb:3e:0b brd ff:ff:ff:ff:ff:ff
3: wlp14s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP mode DORMANT group default qlen 1000
    link/ether 2c:d0:5a:11:92:c2 brd ff:ff:ff:ff:ff:ff
5: docker0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP mode DEFAULT group default 
    link/ether 02:42:b9:b8:50:81 brd ff:ff:ff:ff:ff:ff
7: veth8cd61bb@if6: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master docker0 state UP mode DEFAULT group default 
    link/ether 9a:04:e7:e9:49:45 brd ff:ff:ff:ff:ff:ff link-netnsid 0
```

La comanda ens permet veure les interfícies de xarxa i la seva configuració. Amb **ip link** es veu la informació en capa 2 (enllaç de dades) d'aquestes interfícies.

La comanda **ip** forma part de la suite **iproute2** i es poden fer milers de coses, com activar i desactivar les interfícies, assignar IPs i llistar més característiques.

## Llista les targetes de xarxa (nmcli) - explica què hi veus.

```console
nmcli
```

```
wlp14s0: connected to MosEisley5G
        "Qualcomm Atheros AR9462"
        wifi (ath9k), 2C:D0:5A:11:92:C2, hw, mtu 1500
        ip4 default
        inet4 192.168.2.119/24
        route4 0.0.0.0/0
        route4 169.254.0.0/16
        route4 192.168.2.0/24
        inet6 fe80::b785:f7b3:7a97:779e/64
        route6 fe80::/64
        route6 ff00::/8

docker0: connected to docker0
        "docker0"
        bridge, 02:42:B9:B8:50:81, sw, mtu 1500
        inet4 10.10.0.1/24
        route4 10.10.0.0/24
        inet6 fe80::42:b9ff:feb8:5081/64
        route6 fe80::/64
        route6 ff00::/8

p2p-dev-wlp14s0: disconnected
        "p2p-dev-wlp14s0"
        wifi-p2p, hw

enp15s0: unavailable
        "Qualcomm Atheros AR8151 v2.0"
        ethernet (atl1c), 7C:05:07:CB:3E:0B, hw, mtu 1500

veth8cd61bb: unmanaged
        "veth8cd61bb"
        ethernet (veth), 9A:04:E7:E9:49:45, sw, mtu 1500

lo: unmanaged
        "lo"
        loopback (unknown), 00:00:00:00:00:00, sw, mtu 65536

DNS configuration:
        servers: 192.168.2.1
        domains: institutmontilivi.cat
        interface: wlp14s0

Use "nmcli device show" to get complete information about known devices and
"nmcli connection show" to get an overview on active connection profiles.

Consult nmcli(1) and nmcli-examples(7) manual pages for complete usage details.
```

Es veuen totes les interfícies de xarxa, nom del chipset, la configuració DNS amb el domini de l'institut i les IP4 i IP6. 
Amb altres opcions podem obtenir altra informació més detallada.

Informació dels perfils de connexió actius:
```console
nmcli connection show
```

```
NAME                    UUID                                  TYPE      DEVICE  
MosEisley5G             dfc6df63-8252-4f57-bb6d-ee68d436b02c  wifi      wlp14s0 
docker0                 23a1baaa-e905-43a1-8421-36cf0f5e0b17  bridge    docker0 
Auto ADAMO-8D39         95c61546-aa7f-4cf8-a298-32f097fd8bda  wifi      --      
Auto ADAMO-8D39-5G      7c8c15a2-ce16-4d02-b371-097f88102f36  wifi      --      
Auto alumnesCF          c5479b9b-2a81-4a3e-a2bc-ea4106ab838d  wifi      --      
Auto AndroidAP4D29      3f068731-ca96-4b45-b584-e90904dc6305  wifi      --      
Auto CONVIDATS          8bbd8394-916d-4099-8b18-b5d26cabf41f  wifi      --      
Auto Dset-convidats     b0b5feb4-675c-4ebc-a8fb-ec928830ee37  wifi      --      
Auto Dset-convidats_5G  d5254d9c-b89e-40fd-93f5-433d236a4bf5  wifi      --      
Auto dset-reunions_5G   c671249b-7f95-496e-a555-9fe638222ca1  wifi      --      
Auto educat1x1          2564e5dd-aee5-4264-bc07-2a4226c7c5c0  wifi      --      
Auto MiFibra-88DA-5G    4ed5927d-6ca4-4af4-a150-5e49f925a51f  wifi      --      
Auto MiFibra-ECEA       4a732946-da7f-4006-9ed7-548ae851e802  wifi      --      
Auto MiFibra-ECEA-5G    903b41be-9865-421f-b5a2-1578037ab5ca  wifi      --      
Auto MIWIFI_2G_TLZ4     2426d5f0-a654-424a-87e3-76855589a497  wifi      --      
Auto MOVISTAR_9076      639e0e4b-9c92-4093-a646-5364335cde77  wifi      --      
Auto OPPO A53s          14890a53-e064-4d0d-8f72-bd161e57b1ad  wifi      --      
Auto OPTIMA ENERGIA     d2a5c55c-9823-4103-a35a-13564339745b  wifi      --      
Auto vodafoneBA2112     457d4c88-d758-4d98-bd65-6d41a637c1e8  wifi      --      
Auto vodafoneBA2112_5G  d21fb545-041b-4f9d-b0c4-237ff3eec697  wifi      --      
Auto WifiAnimal         cdb8b262-ec05-42e8-b502-7e683d38fd02  wifi      --      
Auto Wifi_Visitas       b0ca4816-2f84-43ff-952f-b4e35c25dbb5  wifi      --      
VPN DSET                b829cef2-46ec-4cc5-91d5-2a187b724792  vpn       --      
WifiAnimal              122b6b41-baaa-430a-a5c9-83b613a37c72  wifi      --      
WifiAnimal 1            2bc952d8-bfe9-4b08-a0d4-26799ca41d08  wifi      --      
WifiAnimal-5G           e9ef55e9-71da-4d3a-b24c-9a1bc2435c41  wifi      --      
Wired connection 1      d2cc75a5-454a-3961-8b0f-3d79e3f3f9d3  ethernet  -- 
```

Llistar les xarxes WiFi disponibles:
```console
nmcli device wifi list
```

```
IN-USE  BSSID              SSID                              MODE   CHAN  RATE        SIGNAL  BARS  SECURITY    
        1C:28:AF:C1:D3:02  gencat_ENS_EDU                    Infra  1     130 Mbit/s  100     ▂▄▆█  WPA2 802.1X 
        1C:28:AF:C1:D3:01  --                                Infra  1     130 Mbit/s  100     ▂▄▆█  WPA2 802.1X 
        1C:28:AF:C3:21:E0  eduroam                           Infra  1     130 Mbit/s  100     ▂▄▆█  WPA2 802.1X 
        1C:28:AF:C1:D3:04  gencat_ENS_EDU_PORTAL             Infra  1     130 Mbit/s  100     ▂▄▆█  --          
        1C:28:AF:C3:21:E4  gencat_ENS_EDU_PORTAL             Infra  1     130 Mbit/s  97      ▂▄▆█  --          
        00:0C:E6:10:03:03  alumnesBAT                        Infra  11    54 Mbit/s   97      ▂▄▆█  WPA1        
        00:0C:E6:10:03:01  docent                            Infra  11    54 Mbit/s   97      ▂▄▆█  WPA1        
        00:0C:E6:10:03:00  educat1x1                         Infra  11    54 Mbit/s   94      ▂▄▆█  WPA2        
        00:0C:E6:10:01:01  docent                            Infra  11    54 Mbit/s   94      ▂▄▆█  WPA1        
        00:0C:E6:10:01:00  educat1x1                         Infra  11    54 Mbit/s   87      ▂▄▆█  WPA2        
        1C:28:AF:C1:D3:00  eduroam                           Infra  1     130 Mbit/s  84      ▂▄▆█  WPA2 802.1X 
        00:0C:E6:10:01:05  alumnesCF                         Infra  11    54 Mbit/s   84      ▂▄▆█  WPA1        
        1C:28:AF:C1:D3:10  eduroam                           Infra  116   540 Mbit/s  79      ▂▄▆_  WPA2 802.1X 
        1C:28:AF:C1:D3:14  gencat_ENS_EDU_PORTAL             Infra  116   540 Mbit/s  79      ▂▄▆_  --          
        00:0C:E6:10:03:05  alumnesCF                         Infra  11    54 Mbit/s   77      ▂▄▆_  WPA1        
        1C:28:AF:C1:D3:11  --                                Infra  116   540 Mbit/s  77      ▂▄▆_  WPA2 802.1X 
        1C:28:AF:C1:D3:12  gencat_ENS_EDU                    Infra  116   540 Mbit/s  77      ▂▄▆_  WPA2 802.1X 
        1C:28:AF:C3:21:F0  eduroam                           Infra  124   540 Mbit/s  74      ▂▄▆_  WPA2 802.1X 
        1C:28:AF:C3:21:F1  --                                Infra  124   540 Mbit/s  74      ▂▄▆_  WPA2 802.1X 
        00:0C:E6:10:01:03  alumnesBAT                        Infra  11    54 Mbit/s   72      ▂▄▆_  WPA1        
        1C:28:AF:C3:21:F4  gencat_ENS_EDU_PORTAL             Infra  124   540 Mbit/s  72      ▂▄▆_  --          
        1C:28:AF:C3:21:F2  gencat_ENS_EDU                    Infra  124   540 Mbit/s  70      ▂▄▆_  WPA2 802.1X 
        00:0C:E6:10:05:01  docent                            Infra  11    54 Mbit/s   67      ▂▄▆_  WPA1        
*       E8:9F:80:1C:35:62  MosEisley5G                       Infra  36    405 Mbit/s  67      ▂▄▆_  WPA2        
        1C:28:AF:C0:56:E3  gencat_ENS_EDU                    Infra  1     130 Mbit/s  65      ▂▄▆_  WPA2 802.1X 
        1C:28:AF:C0:56:E0  eduroam                           Infra  1     130 Mbit/s  65      ▂▄▆_  WPA2 802.1X 
        00:0C:E6:10:05:05  alumnesCF                         Infra  11    54 Mbit/s   65      ▂▄▆_  WPA1        
        00:0C:E6:10:07:03  alumnesBAT                        Infra  11    54 Mbit/s   65      ▂▄▆_  WPA1        
        E8:9F:80:1C:35:61  MosEisley                         Infra  6     405 Mbit/s  64      ▂▄▆_  WPA2        
        00:0C:E6:10:07:01  docent                            Infra  11    54 Mbit/s   64      ▂▄▆_  WPA1        
        00:0C:E6:10:05:03  alumnesBAT                        Infra  11    54 Mbit/s   64      ▂▄▆_  WPA1        
        00:0C:E6:10:07:00  educat1x1                         Infra  11    54 Mbit/s   59      ▂▄▆_  WPA2        
        1C:28:AF:C8:D3:E0  eduroam                           Infra  1     130 Mbit/s  57      ▂▄▆_  WPA2 802.1X 
        1C:28:AF:C0:D9:C2  gencat_ENS_EDU                    Infra  9     130 Mbit/s  57      ▂▄▆_  WPA2 802.1X 
        1C:28:AF:C0:D9:C4  gencat_ENS_EDU_PORTAL             Infra  9     130 Mbit/s  57      ▂▄▆_  --          
        00:0C:E6:10:05:00  educat1x1                         Infra  11    54 Mbit/s   57      ▂▄▆_  WPA2        
        00:0C:E6:00:0B:01  docent                            Infra  6     54 Mbit/s   55      ▂▄__  WPA1        
        1C:28:AF:C0:D9:C0  eduroam                           Infra  9     130 Mbit/s  55      ▂▄__  WPA2 802.1X 
        82:2A:A8:01:9B:96  --                                Infra  11    130 Mbit/s  55      ▂▄__  WPA2        
        00:0C:E6:10:07:05  alumnesCF                         Infra  11    54 Mbit/s   54      ▂▄__  WPA1        
        1C:28:AF:C0:D9:D2  gencat_ENS_EDU                    Infra  116   540 Mbit/s  54      ▂▄__  WPA2 802.1X 
        1C:28:AF:C0:56:F1  --                                Infra  116   540 Mbit/s  54      ▂▄__  WPA2 802.1X 
        1C:28:AF:C0:56:F3  gencat_ENS_EDU                    Infra  116   540 Mbit/s  54      ▂▄__  WPA2 802.1X 
        1C:28:AF:C0:D9:D4  gencat_ENS_EDU_PORTAL             Infra  116   540 Mbit/s  54      ▂▄__  --          
        1C:28:AF:C0:56:F2  gencat_ENS_EDU_PORTAL             Infra  116   540 Mbit/s  54      ▂▄__  --          
        1C:28:AF:C0:D9:D0  eduroam                           Infra  116   540 Mbit/s  52      ▂▄__  WPA2 802.1X 
        1C:28:AF:C0:D9:D1  --                                Infra  116   540 Mbit/s  52      ▂▄__  WPA2 802.1X 
        1C:28:AF:C0:56:F0  eduroam                           Infra  116   540 Mbit/s  52      ▂▄__  WPA2 802.1X 
        1C:28:AF:C3:29:C0  eduroam                           Infra  1     130 Mbit/s  49      ▂▄__  WPA2 802.1X 
        80:2A:A8:01:9B:96  InformaticaAlumnes                Infra  11    130 Mbit/s  47      ▂▄__  WPA2        
        1C:28:AF:C0:6C:E3  gencat_ENS_EDU                    Infra  1     130 Mbit/s  45      ▂▄__  WPA2 802.1X 
        1C:28:AF:C2:36:21  --                                Infra  5     130 Mbit/s  45      ▂▄__  WPA2 802.1X 
        00:0C:E6:10:11:05  alumnesCF                         Infra  11    54 Mbit/s   45      ▂▄__  WPA1        
        1C:28:AF:C2:36:22  gencat_ENS_EDU                    Infra  5     130 Mbit/s  44      ▂▄__  WPA2 802.1X 
        1C:28:AF:C2:36:24  gencat_ENS_EDU_PORTAL             Infra  5     130 Mbit/s  44      ▂▄__  --          
        A0:1D:48:76:5E:FE  HP-Print-FE-Officejet Pro X576dw  Infra  6     54 Mbit/s   44      ▂▄__  WPA2        
        00:0C:E6:10:11:03  alumnesBAT                        Infra  11    54 Mbit/s   44      ▂▄__  WPA1        
        1C:28:AF:C3:5E:A1  --                                Infra  1     130 Mbit/s  42      ▂▄__  WPA2 802.1X 
        1C:28:AF:C3:5E:A3  gencat_ENS_EDU                    Infra  1     130 Mbit/s  42      ▂▄__  WPA2 802.1X 
        1C:28:AF:C2:36:30  eduroam                           Infra  132   540 Mbit/s  42      ▂▄__  WPA2 802.1X 
        1C:28:AF:C2:36:31  --                                Infra  132   540 Mbit/s  42      ▂▄__  WPA2 802.1X 
        1C:28:AF:C2:36:32  gencat_ENS_EDU                    Infra  132   540 Mbit/s  42      ▂▄__  WPA2 802.1X 
        1C:28:AF:C2:36:34  gencat_ENS_EDU_PORTAL             Infra  132   540 Mbit/s  42      ▂▄__  --          
        1C:28:AF:C3:5E:A0  eduroam                           Infra  1     130 Mbit/s  40      ▂▄__  WPA2 802.1X 
        1C:28:AF:C5:DC:62  gencat_ENS_EDU                    Infra  1     130 Mbit/s  39      ▂▄__  WPA2 802.1X 
        1C:28:AF:C5:DC:64  gencat_ENS_EDU_PORTAL             Infra  1     130 Mbit/s  39      ▂▄__  --          
        00:0C:E6:10:06:05  alumnesCF                         Infra  11    54 Mbit/s   39      ▂▄__  WPA1        
        1C:28:AF:C5:DC:60  eduroam                           Infra  1     130 Mbit/s  37      ▂▄__  WPA2 802.1X 
        00:0C:E6:10:11:00  educat1x1                         Infra  11    54 Mbit/s   35      ▂▄__  WPA2        
        1C:28:AF:BF:E6:43  gencat_ENS_EDU                    Infra  13    130 Mbit/s  34      ▂▄__  WPA2 802.1X 
        1C:28:AF:BF:E6:42  gencat_ENS_EDU_PORTAL             Infra  13    130 Mbit/s  34      ▂▄__  --          
        AA:22:EF:C4:95:17  Ok2                               Infra  11    135 Mbit/s  32      ▂▄__  WPA2        
        1C:28:AF:C2:36:20  eduroam                           Infra  5     130 Mbit/s  30      ▂___  WPA2 802.1X 
        00:0C:E6:10:11:01  docent                            Infra  11    54 Mbit/s   30      ▂___  WPA1        
        1C:28:AF:C2:6C:C0  eduroam                           Infra  13    130 Mbit/s  30      ▂___  WPA2 802.1X 
        00:0C:E6:10:08:05  alumnesCF                         Infra  11    54 Mbit/s   27      ▂___  WPA1        
        1C:28:AF:BF:92:00  eduroam                           Infra  13    130 Mbit/s  27      ▂___  WPA2 802.1X 
        68:14:01:A1:02:51  HP-Print-51-LaserJet Pro MFP      Infra  6     65 Mbit/s   25      ▂___  --          
        1C:28:AF:C2:A4:E3  gencat_ENS_EDU                    Infra  13    130 Mbit/s  22      ▂___  WPA2 802.1X 
        1C:28:AF:C2:A4:E2  gencat_ENS_EDU_PORTAL             Infra  13    130 Mbit/s  20      ▂___  -- 
```

Connectar-nos a una xarxa Wifi:
```console
nmcli device wifi connect MosEisley5G
```

## Llista les targetes de xarxa d'una altre forma diferent però en aquest cas només s'han de veure els noms de les targetes de xarxa com a resultat de la instrucció.

```console
basename -a /sys/class/net/*
```

```
docker0
enp15s0
lo
veth8cd61bb
wlp14s0
```

Amb aquesta comanda obtenim els noms "base" dels directoris, sense tota la ruta. En el directori */sys/class/net/* tenim un directori per cada interfície de xarxa.

## Desactiva i activa una teva targeta de xarxa

Desactivar targeta:

```console
sudo ifconfig wlp14s0 down
```

```console
sudo ip link set wlp14s0 down
```

Activar targeta:

```console
sudo ifconfig wlp14s0 up
```

```console
sudo ip link set wlp14s0 up
```

Desactivar totes les targetes:
```bash
for intf in /sys/class/net/*; do
    sudo ifconfig `basename $intf` down
done
```

Activar totes les targetes:
```bash
for intf in /sys/class/net/*; do
    sudo ifconfig `basename $intf` up
done
```