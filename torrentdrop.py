#!/usr/bin/python2

import os
from flask import Flask, request, render_template
import requests

app = Flask(__name__)


WATCH_BASE = '/home/ship/torrent/watch/'


@app.route('/')
def ui():
    return render_template('drop.html')


@app.route('/drop', methods=['POST'])
def catch():
    destination_sub = request.form['destination']
    destination_abs = os.path.abspath(os.path.join(WATCH_BASE, destination_sub))
    if WATCH_BASE not in destination_abs:
        return "Haha nice try. go fix the destination setting.", 401, []

    torrent_url = request.form['torrent']
    torrent = requests.get(torrent_url)
    if torrent.response_code != 200:
        return "Torrent download failed.", 404, []

    filename = torrent.headers['content-disposition'].split('filename=')[1][1:-1]

    print 'saving {}...'.format(filename)
    try:
        with open(os.path.join(destination_abs, filename), 'w') as f:
            f.write(torrent.content)
    except IOError as e:
        return "Couldn't save. Maybe fix the destination? {}".format(e), 401, []

    return "cool."


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5050)
