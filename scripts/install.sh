#!/bin/bash

git clone https://github.com/alliedmodders/amxmodx.git
git checkout tags/amxmodx-1.8.2

wget https://raw2.github.com/alliedmodders/amxmodx/master/support/checkout-deps.sh
bash checkout-deps.sh --no-mysql

mkdir build
cd build
python ../amxmodx/configure.py --no-mysql
cd ..

ambuild build