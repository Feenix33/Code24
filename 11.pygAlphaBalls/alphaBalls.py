# ###########################################################################
# alphaBalls
# pygame demo drawing balls with alpha colors
# ###########################################################################

import pygame, sys
from pygame.locals import * # pygame.locals has constants
import random;

WIDTH = 800
HEIGHT = 500

# ###########################################################################

def draw_circle_alpha(surface, color, center, radius):
    target_rect = pygame.Rect(center, (0, 0)).inflate((radius * 2, radius * 2))
    shape_surf = pygame.Surface(target_rect.size, pygame.SRCALPHA)
    pygame.draw.circle(shape_surf, color, (radius, radius), radius)
    surface.blit(shape_surf, target_rect)

def draw_rect_alpha(surface, color, rect):
    shape_surf = pygame.Surface(pygame.Rect(rect).size, pygame.SRCALPHA)
    pygame.draw.rect(shape_surf, color, shape_surf.get_rect())
    surface.blit(shape_surf, rect)

def draw_polygon_alpha(surface, color, points):
    lx, ly = zip(*points)
    min_x, min_y, max_x, max_y = min(lx), min(ly), max(lx), max(ly)
    target_rect = pygame.Rect(min_x, min_y, max_x - min_x, max_y - min_y)
    shape_surf = pygame.Surface(target_rect.size, pygame.SRCALPHA)
    pygame.draw.polygon(shape_surf, color, [(x - min_x, y - min_y) for x, y in points])
    surface.blit(shape_surf, target_rect)


# ###########################################################################

def draw_grey_bars(surf):
    (wsurf,hsurf) = surf.get_size()
    dw = wsurf/10
    clr = 5
    for x in range(0, int(wsurf), int(dw)):
        pygame.draw.rect(surf,(clr,clr,clr),(x,0,dw,hsurf))
        clr += 25

def draw_balls(surf, yPct):
    (wsurf,hsurf) = surf.get_size()
    dw = wsurf/20
    clr = 25
    y = hsurf*yPct
    for x in range(0, int(wsurf), int(dw)):
        #pygame.draw.circle(surf, Color(0,0,clr,clr),(x,y),dw)
        draw_circle_alpha(surf, Color(0,0,clr,clr),(x,y),dw)
        clr += 10
    

def init_simulation():
    return

# ###########################################################################

def main():
    pygame.init()

    screen = pygame.display.set_mode((WIDTH, HEIGHT))
    pygame.display.set_caption("pygame Alpha Balls")

    gDone = False
    doLoop = True
    clrBackground = (128,128,128)

    while not gDone:
        for event in pygame.event.get():
            if event.type == QUIT:
                gDone = True
            if event.type == MOUSEBUTTONUP:
                init_simulation()
                doLoop = True
            if event.type == KEYUP:
                #if event.key == pygame.K_a: print("a pressed")
                if event.key == pygame.K_ESCAPE:
                    gDone = True
                else:
                    init_simulation()
                    doLoop = True

        if doLoop:

            # draw loop
            #screen.fill(clrBackground)
            draw_grey_bars(screen)
            draw_balls(screen, 0.2)
            pygame.display.flip()
  
    pygame.quit()

# ###########################################################################
if __name__ == "__main__":
    main()
    sys.exit()

