#!/bin/bash 
#PBS -l nodes=1:ppn=8,walltime=10:00:00
#PBS -M rkoonch@iu.edu
#PBS -m abe

cd /N/u/rkoonch/Karst
module switch python/2.7.3 python/3.6.3
python dtw_script.py
