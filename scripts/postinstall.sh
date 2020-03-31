#!/bin/sh

DICTIONARY_DIRECTORY='dictionaries'
CONCATED_NAME='all'

concat_by_extension () {
  mkdir -p $DICTIONARY_DIRECTORY
  cat $DICTIONARY_DIRECTORY/*.$1 > $CONCATED_NAME.$1
}

for extension in 'dic' 'aff'; do
  concat_by_extension $extension
done
