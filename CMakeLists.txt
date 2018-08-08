cmake_minimum_required(VERSION 2.8)
project(basilio)

set(CMAKE_C_STANDARD 11)

file(GLOB_RECURSE basilio_src
    "src/*.c"
    "src/*.h"
)

find_package(SDL)

include_directories(${SDL_INCLUDE_DIR})
add_executable(basilio ${basilio_src})
target_link_libraries(basilio ${SDL_LIBRARY})

install(TARGETS basilio RUNTIME DESTINATION bin)