"""
Generate art with flow fields
Inspired by Tyler Hobbs: https://tylerxhobbs.com/essays/2020/flow-fields
"""

from PIL import Image, ImageDraw
import numpy as np
from pprint import pprint
from tqdm import tqdm
import os
from img_styles import color_palettes
import matplotlib.pyplot as plt
import cv2

"""
Let's assume we've got an image that's 1000 x 1000 pixels, and we want to give ourselves 50% extra margin outside the bounds of the image.
"""
class FlowFieldImageMaker():
    def __init__(self, img_width=1000, img_height=1000, res_percent = .01, line_color = [0, 0, 0], line_thickness = 0, background_color=[0,0,0]):
        # Vars for image dimensions
        self.img_width = img_width
        self.img_height = img_height
        self.left_x = int(img_width * -0.5)
        self.right_x = int(img_width*1.5)
        self.top_y = int(img_height*-.5)
        self.bottom_y = int(img_height * 1.5)
        self.img = np.zeros((img_height, img_width, 3), dtype=np.uint8)
        self.line_color = line_color
        self.line_thickness = line_thickness
        
        # Var for ratio from image to flow field
        self.resolution = int(img_width * res_percent)

        # Vars for flow field
        self.num_cols = int((self.right_x - self.left_x) / self.resolution)
        self.num_rows = int((self.bottom_y - self.top_y) / self.resolution)
        self.grid = [[0]*self.num_cols]*self.num_rows

        # Styles
        self.palettes = color_palettes
        self.background_color = background_color
        for i in range(0, self.img_height):
            for j in range(0, self.img_width):
                self.img[i][j] = background_color
        # Smooth line thickness
        



    def set_background_color(self, color=[0,0,0]):
        for i in range(0, self.img_height):
            for j in range(0, self.img_width):
                self.img[i][j] = color

        return

    def populate_field(self, default_angle = np.pi * 0.25, field_type = 'straight'):
        """
        populate field with angles depending on type
        Types available: straight, single_curve
        """
        field_types = ['straight', 'single_curve', 'random', 'columns', 'columns2', 'sinewave']
        if field_type not in field_types:
            raise Exception("I can't make that field type!")

        if field_type == 'straight':
            for i in range(0, self.num_cols):
                for j in range(0, self.num_rows):
                    self.grid[i][j] = default_angle

        if field_type == 'single_curve':
            for i in range (0, self.num_cols):
                for j in range(0, self.num_rows):
                    angle = (j/self.num_rows) * np.pi
                    self.grid[i][j] = angle

        if field_type == 'random':
            for i in range (0, self.num_cols):
                for j in range(0, self.num_rows):
                    """
                    30 is straight with some squiggles
                    10 is confetti
                    5 is straight
                    200 is squiggly lines
                    """
                    angle = default_angle * np.random.randint(0, 500)
                    self.grid[i][j] = angle

        if field_type == 'columns':
            # do something?
            sections = int(self.num_cols/10)
            changer = 1

            for k in range(0, 10):
                for i in range(0, sections):
                    col_index = k * i
                    if col_index >= self.num_cols:
                        break

                    for j in range(0, self.num_rows):
                        angle = (j/self.num_rows) * np.pi * changer
                        self.grid[col_index][j] = angle
                changer = changer + 1

        if field_type == 'columns2':
            # do something?
            sections = int(self.num_cols/10)
            changer = 10
            adder = 15 # 10 gives cool blocky lines, 20 is confetti, 30 sorta block v, 40 is corn?

            for k in range(0, 10):
                for i in range(0, sections):
                    col_index = k * i
                    if col_index >= self.num_cols:
                        break

                    for j in range(0, self.num_rows):
                        angle = (j/self.num_rows) * np.pi * changer
                        self.grid[col_index][j] = angle
                changer = changer + adder

        if field_type == 'sinewave':
            for i in range(0, self.num_cols):
                for j in range(0, self.num_rows):
                    angle = (j/self.num_rows) * 3*np.pi
                    # angle = np.pi / 2
                    self.grid[i][j] = angle

        return

    def draw_curve(self, x=0, y=0, num_steps = 1000, step_length=.001, mark_start = False):
        step_length = step_length * self.img_width # .1% to .5% of image with

        for i in range(0, num_steps):
            # Check bounds (because of offset)
            if not (y >= 0 and y < self.img_width and x >= 0 and x < self.img_height):
                continue

            if i == 0 and mark_start:
                self.line_thickness = self.line_thickness + 10
                self.draw_vertex(x, y)
                self.line_thickness = self.line_thickness - 10
            else:
                self.draw_vertex(x, y)

            x_offset = x - self.left_x
            y_offset = y - self.top_y

            column_index = int(x_offset / self.resolution)
            row_index = int(y_offset / self.resolution)
    
            grid_angle = self.grid[column_index][row_index]

            x_step = step_length * np.cos(grid_angle)
            y_step = step_length * np.sin(grid_angle)

            x = x + x_step
            y = y + y_step
        return

    def draw_vertex(self, x, y):
        x = int(x)
        y = int(y)
        self.img[x][y] = self.line_color

        lower = int(-1 * self.line_thickness/2)
        upper = int(self.line_thickness/2)

        if self.line_thickness:
            for i in range(lower, upper):
                for j in range(lower, upper):
                    try:
                        self.img[x+i][y+j] = self.line_color
                    except:
                        continue

    def make_smooth_line(self):
        thic = Maker.line_thickness
        circle = np.zeros((thic, thic, 3), dtype=np.uint8)

        col = Maker.background_color
        col2 = Maker.line_color

        empty_space = int(.25*thic)
        bottom_thresh = thic - empty_space

        for i in range(0, thic):
            # populate rows
            print(i, bottom_thresh)
            print(i > bottom_thresh)
            if empty_space > 0 and i < (thic - empty_space): # fill not empty space
                circle[i][empty_space:-empty_space] = col
                empty_space -= 1
            elif i >= bottom_thresh: # bottom rows
                print("here")
                empty_space += 1
                circle[i][empty_space:-empty_space] = col
            else:
                circle[i][:] = col
        return circle

    def draw_many_lines(self, style="random", color_palette = "pickle_jar", num_lines = 100, num_steps=1000):
        styles = ["random", "diag1"]
        if style not in styles:
            Exception("I can't draw that style!")

        # Pick color
        palette = self.palettes[color_palette]
        pal_length = len(palette)
        
        x = 0
        y = 0
        x_adder = self.img_width / num_lines
        y_adder = self.img_height / num_lines

        if style == "wave":
            sine_adder = (2* np.pi) / self.img_width
            sine_multiplier = self.img_height / 3
        if style == "circle":
            radius = self.img_width / 4
            start = radius
            center = [self.img_width / 2, self.img_height / 2]
            x = start
            theta = 0

        for i in tqdm(range(0, num_lines)):
            # set line color from palette
            if pal_length == 0:
                self.line_color = [np.random.randint(0, 255), np.random.randint(0, 255), np.random.randint(0, 255)]
            else:
                index = i % (pal_length - 1)
                self.line_color = palette[index]

            if num_steps == 0:
                # Make lines of random length
                num_steps = np.random.randint(50, self.img_height)

            """UPDATE X Y"""
            if style == "random":
                # Start in random places
                x = np.random.randint(0, self.img_width)
                y = np.random.randint(0, self.img_height)
                
            if style == "diag1":
                # Diagonal from top left to bottom right
                x += x_adder
                y += y_adder

            if style == "wave":
                # sine wave
                loc = y * (self.img_width / self.num_cols)
                x = (self.img_width / 2) + np.sin(loc * sine_adder)*sine_multiplier
                y += y_adder
                test.append(x)

            if style == "circle":
                # i acts like theta
                theta += 2*np.pi/num_lines
                x = center[0] + radius*np.cos(theta)
                y = center[1] + radius*np.sin(theta)

            """DRAW CURVE"""
            self.draw_curve(x, y, num_steps, mark_start=False)
        return

    def draw_and_save_image(self, show=True, save=True):
        png_image = Image.fromarray(self.img, 'RGB')

        if save:
            # Check for image numbers
            num_list = [0]
            if os.listdir('images'):
                for filename in os.listdir('images'):
                    filename = filename.replace('flow_field', '')
                    filename = filename.replace('.png', '')
                    num_list.append(int(filename))
                next_num = max(num_list) + 1

            image_name = "flow_field" + str(next_num)
        
            png_image.save('images/' + image_name + '.png')
            print("Saved image {}".format(image_name))

        if show:
            png_image.show()
            png_image.close()

    def visualize_field(self):
        visual = [[0]*self.num_cols]*self.num_rows

        modifier = (2 * np.pi) / 255

        for i in range(0, self.num_cols):
            for j in range(0, self.num_rows):
                angle = self.grid[i][j]
                color = angle * modifier
                visual[i][j] = [color, color, color]

        # pprint(self.grid)
        visual = np.array(visual)
        visual = Image.fromarray(visual, 'RGB')
        visual.show()


def test_flow_field():
    # Maker.visualize_field()
    Maker.draw_curve(x=500, y=500)
    Maker.draw_curve(x=600, y=600)
    Maker.draw_curve(x=400, y=600)
    Maker.draw_and_save_image(save=False)
    return

def test():
    thic = Maker.line_thickness
    circle = np.zeros((thic, thic, 3), dtype=np.uint8)

    col = Maker.background_color
    col2 = Maker.line_color

    empty_space = int(.25*thic)
    bottom_thresh = thic - empty_space

    for i in range(0, thic):
        # populate rows
        print(i, bottom_thresh)
        print(i > bottom_thresh)
        if empty_space > 0 and i < (thic - empty_space): # fill not empty space
            circle[i][empty_space:-empty_space] = col
            empty_space -= 1
        elif i >= bottom_thresh: # bottom rows
            print("here")
            empty_space += 1
            circle[i][empty_space:-empty_space] = col
        else:
            circle[i][:] = col

    pprint(circle)

if __name__ == '__main__':
    Maker = FlowFieldImageMaker(img_width=1000, img_height=1000,line_thickness = 10, background_color=[255, 255, 255])
    # Maker.populate_field(field_type="sinewave")
    # Maker.draw_many_lines(style="circle", color_palette="vivid_dream", num_lines = 300)
    # Maker.draw_and_save_image()
    test()
