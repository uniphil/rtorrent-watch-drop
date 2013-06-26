set `WATCH_BASE` to the absolute path to your watch folder in `torrentdrop.py`.

run it on the remote server (running rtorrent) with something like:

```bash
$ gunicorn -w 1 -b 0.0.0.0:5050 torrentdrop:app
```

my server runs arch, so I made a `rtdrop.service` file in `/etc/systemd/system/`:

```
[Unit]
Description = Drop torrents files into rtorrent watch folders remotely by url

[Service]
WorkingDirectory = /home/ship/code/torrent-drop
ExecStart = /usr/bin/gunicorn torrentdrop:app -w 1 -b 0.0.0.0:5050

[Install]
WantedBy=multi-user.target
```

The main folder of this directory should also work as a chrome extension.
Configure it on its options page, and then you should be able to right-click -> send to rtorrent on `.torrent` files!
