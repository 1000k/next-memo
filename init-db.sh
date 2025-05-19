#!/bin/bash
set -e
createdb -U "$POSTGRES_USER" next-memo
