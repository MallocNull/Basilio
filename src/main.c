#include "SDL.h"
#include <stdio.h>

int main(int argc, char* argv[]) {
    SDL_Surface* screen;

    if(SDL_Init(SDL_INIT_VIDEO) == -1)
        return -1;
    atexit(SDL_Quit);

    screen = SDL_SetVideoMode(640, 480, 8, SDL_SWSURFACE);
    if(screen == NULL)
        return -1;

    // if you are reading this your usc

    return 0;
}