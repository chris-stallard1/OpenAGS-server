---
title: 'OpenAGS: An Analysis Tool for Prompt Gamma Activation Analysis'
tags:
  - Python
  - spectroscopy
  - Neutron Actication Analysis
authors:
  - name: Christopher Stallard
    orcid: 0000-0000-0000-0000
    affiliation: 1

affiliations:
 - name: National Institute of Standards and Technology, USA
   index: 1

date: 13 August 2022
bibliography: paper.bib
---

# Summary

OpenAGS is a web-based collaborative analysis tool which seeks to extract elemental mass information from a prompt gamma ray spectrum from thermal neutron capture. It combines three main steps to achieve that goal. First, it searches for characteristic emission peaks based on the analyst’s pre-selected elements of interest in a published database. Then, it fits a sum of multiple peak models (for example, Gaussian peaks) and a single background model (for example, a linear background). Finally, it matches the peaks found in the data to the lookup table which contains a known sensitivity for the element based on the local reactor/detector configuration and k0 values `[@lindstrom:2003; @revay:2012]` fetched from a published database. OpenAGS reports a mass or molar value for each element of interest. OpenAGS provides many choices for peak and background models and supports batch processing of similar spectra. The Python backend of the program (the `openags` package) is separate from both the web server and the Hypertext Markup Language (HTML), Cascading Style Sheets (CSS), and JavaScript (JS) frontend (stored in this repository), and can be used standalone. This separation allows for users proficient in Python to automate simpler analysis tasks, while most users can use the intuitive GUI provided by the web server. A performance analysis of many different PGAA data analysis programs, including OpenAGS, is currently being planned at the National Institute of Standards and Technology (NIST). OpenAGS is built to be modular, and is built using standard scientific python libraries such as numpy `[@harris:2020]` and scipy `[@Virtanen:2020]`. Future expansion of the program's offerings for peak and background models is expected.

# Statement of need

Prompt Gamma Activation Analysis (PGAA) `[@paul:2000; @lindstrom:2012]` and the closely related Neutron Activation Analysis (NAA) are fields with relatively small communities, and with only a few research reactor-based neutron sources capable of producing the required flux for reasonably short analysis time. Analysis of data from these fields is typically performed using many different proprietary programs. There are many advantages of an open-source web-based analysis platform over a proprietary desktop program. Researchers at different neutron sources can easily share data by simply sharing a link to a particular analysis. Additionally, if OpenAGS becomes standardized (or at least has analysis results included in papers alongside traditional software), Researchers at different facilities can compare analysis results without worrying about discrepancies arising from the use of different software. Users do not have to install any programs beyond a web browser, which broadens the potential user base to include researchers who use PGAA/NAA as an analysis tool in their fields. Any updates made to the code running on the server will be instantly propagated to users. 

One of the most important peaks in PGAA is the Doppler-broadened B-11 emission peak at 478 keV, because very small amounts of boron produce large amounts of gamma-rays. However, although more advanced functions required to model this peak physically have been published `[@kubo:2000; @szentmiklosi:2007; @magara:1998]`, existing publicly available software has not yet implemented them. OpenAGS changes this, implementing two model functions for this purpose.

OpenAGS represents a promising advance in collaboration capabilities across the PGAA and NAA research communities. The collaborative analysis possibilities enabled by web hosting, the interactive nature of peak fitting and parameter adjustment, and the batch processing capability all contribute to the flexibility of OpenAGS to handle day-to-day analytical tasks, and for future standardization methods.  The potential for easily incorporating additional model functions and standardization mechanisms will hopefully further contribute to standardization efforts across the international community.

# Acknowledgements

Heather Chen-Mayer contributed significantly to the software review process and provided many suggestions for improvement during development.

This work was done as a part of the Summer High School Internship Program (SHIP) at the NIST Center for Neutron Research, supported by the Center for High-Resolution Neutron Scattering.  

Other open-source python packages were integral to the success of this project. 
Specifically:
 - Quart `[@jones:2021]` was used to create the web middleware
 - xylib `[@wojdyr:2021]` was used to parse proprietary spectrum file formats


# References