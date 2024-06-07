

import React, { Fragment } from 'react';
import Wrapper from '@/components/Shared/Wrapper';
import Card from '@/components/Shared/Card/Card';
import { ProjectData } from '@/constant/ProjectsData.js';

const Projects = () => {
  return (
    <Fragment>
      <Wrapper id="OurWork" style="h-full pb-20 mt-12">
        <div className="w-full flex flex-wrap justify-around items-center gap-6">
          <div className="w-full flex flex-wrap justify-start items-center">
            {ProjectData.map((project) => (
              <div key={project.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 my-4">
                <Card
                  title={project.title}
                  description={project.description}
                  logo={project.logo}
                  route={project.route}
                />
              </div>
            ))}
          </div>
        </div>
      </Wrapper>
    </Fragment>
  );
};

export default Projects;
