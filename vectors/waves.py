from svg_generator import MakeSVG
import numpy as np
from tqdm import tqdm
from img_styles import color_palettes

class WaveMaker():
    def __init__(self, height=500, width=500, background = True, color="white", palette = None):
        self.img = MakeSVG(height=height, width=width, background=background, color=color)
        self.height = height
        self.width = width
        if palette:
            self.palette = color_palettes[palette]
        else:
            self.palette = ["#404040"]
        self.line_color = self.palette[0]

    def draw_sine_wave(self, num_points = 100, start_x = 0, start_y = 0, amplitude = 100, num_bumps=2):
        # sinewave

        angle_step = num_bumps*np.pi / num_points
        length_step = self.width / num_points
        x = start_x
        y = start_y
        points = []

        for i in range(0, num_points):
            points.append((x, y))
            angle = angle_step*i
            x = x+length_step
            y = np.sin(angle)*amplitude + start_y

        self.img.draw_line(points, color=self.line_color)
        return

    def switch_line_color(self, index):
        pal_length = len(self.palette)
        if pal_length > 1:
            pal_index = index % (pal_length-1)
            self.line_color = self.palette[pal_index]
        else:
            return
        return


    def draw_layered_lines(self, num_bumps=2):
        for i in tqdm(range(0, 400, 5)):
            num_bumps = np.random.randint(0, 10)
            middle = self.height / 2
            start_y = np.random.randint(middle - 50, middle + 50)
            amplitude = np.random.randint(10, 100)
            self.draw_sine_wave(start_y = start_y, amplitude=amplitude, num_bumps=num_bumps)
            self.switch_line_color(i)

        return

if __name__ == '__main__':
    background = True
    Maker = WaveMaker(background=background, color="black", palette = "ice cream")
    # Maker.draw_sine_wave(start_y = Maker.height/2)
    Maker.draw_layered_lines(num_bumps=4)
    Maker.img.save_and_view(temp=False)