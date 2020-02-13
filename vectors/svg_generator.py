"""
resources
- keyword arg examples: https://www.programcreek.com/python/example/100980/svgwrite.Drawing
"""

import svgwrite
import subprocess
import shutil
import os
import numpy as np

class MakeSVG():
    def __init__(self, background = None, height=500, width=500):
        self.dwg = svgwrite.Drawing(height=height, width=width) # 500px x 500 px
        if background:
            self.dwg.add(self.dwg.rect((0, 0), (width, height), fill='white'))

    # def draw_temp(self):
    #     dwg = svgwrite.Drawing(height=500, width=500) 
    #     # dwg.add(dwg.rect((0, 0), (100, 100), fill='blue'))
    #     self.dwg.add(self.dwg.line((0, 0), (300, 300), stroke="red"))
    #     points = []
    #     for i in range(0, 10):
    #         point = (np.random.randint(0, 500), np.random.randint(0, 100))
    #         points.append(point)
    #     # self.dwg.add(self.dwg.polyline(points=points, stroke="blue", fill="none"))
    #     self.draw_line(points)

    #     return

    def draw_line(self, points = [], color="red", opacity=1, fill="none", width=1, stroke_linejoin="round", stroke_linecap="round"):
        """
        Takes array of tuples and draws lines
        """
        self.dwg.add(self.dwg.polyline(points = points,
                                        stroke = color,
                                        stroke_opacity = opacity,
                                        fill = fill,
                                        stroke_width = width,
                                        stroke_linejoin = stroke_linejoin,
                                        stroke_linecap = stroke_linecap
                                        )
                    )
        return

    def save_and_view(self, temp=True):
        """
        Saves svg in either svgs or temp_files path (latter can be deleted.)
        Svg must be saved before it can be viewed
        """
        if temp:
            # Check for image numbers
            num_list = [0]
            if os.path.isdir('temp_files'):
                for filename in os.listdir('temp_files'):
                    filename = filename.replace('image', '')
                    filename = filename.replace('.svg', '')
                    num_list.append(int(filename))
            else:
                print("Making temp_files directory")
                os.mkdir('temp_files')

            next_num = max(num_list) + 1
            image_path = "temp_files/image" + str(next_num) + ".svg"
        else:
            # Check for image numbers
            num_list = [0]
            if os.listdir('svgs'):
                for filename in os.listdir('svgs'):
                    filename = filename.replace('image', '')
                    filename = filename.replace('.svg', '')
                    num_list.append(int(filename))
                next_num = max(num_list) + 1

            image_path = "svgs/image" + str(next_num) + ".svg"

        # save image
        self.dwg.saveas(image_path)
        # view image
        subprocess.call(('xdg-open', image_path))

        return

    def delete_temps(self):
        shutil.rmtree('temp_files')


if __name__ == '__main__':
    Maker = MakeSVG()
    Maker.draw_temp()
    Maker.save_and_view()
