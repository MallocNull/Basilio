cmake_minimum_required(VERSION 2.8)
project(basilio)

set(CMAKE_C_STANDARD 11)

file(GLOB_RECURSE basilio_src
    "src/*.c"
    "src/*.h"
)

find_package(SDL2 REQUIRED)
include_directories(SDL2 ${SDL_INCLUDE_DIRS})

add_executable(basilio ${basilio_src})
target_link_libraries(basilio ${SDL_LIBRARIES})

install(TARGETS basilio RUNTIME DESTINATION bin)