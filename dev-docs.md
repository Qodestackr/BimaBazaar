pnpm biome check --write src

<!-- rm -rf ~/.cache/biome if its stuck kill it -->

pnpm biome check --write --threads=4 src
env RUST_BACKTRACE=1 pnpm biome check --write src

pnpm biome lint --write src
pnpm biome format --write src
pnpm biome check src
