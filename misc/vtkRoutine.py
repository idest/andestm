import vtk

###############################################################################
################################### Readers ###################################
###############################################################################

reader = vtk.vtkXMLImageDataReader()
reader.SetFileName("vtk_files/geotherm.vti")
reader.Update()

print reader.GetOutput()
array = reader.GetOutput().GetPointData().GetArray(0) #.GetRange()
reader.GetOutput().GetPointData().SetScalars(array)
print reader.GetOutput().GetPointData().GetScalars()
#print reader.GetOutput().GetClassName()
#print reader.GetOutput().GetPointData().GetScalars()
#print reader.GetOutput().GetScalarRange()
print reader.GetOutput().GetBounds()
reader.GetOutput().SetOrigin(0,0,0)
#reader.GetOutput().SetOrigin(0,0,-178)
#reader.GetOutput().SetDimensions(176,101,1)
#reader.GetOutput().AllocateScalars(vtk.VTK_DOUBLE, 1)
"""
labSlabReader = vtk.vtkXMLImageDataReader()
labSlabReader.SetFileName("labslab.vti")
labSlabReader.Update()
labSlabArray = labSlabReader.GetOutput().GetPointData().GetArray(0)
labSlabReader.GetOutput().GetPointData().SetScalars(labSlabArray)

mohoReader = vtk.vtkXMLImageDataReader()
mohoReader.SetFileName("moho.vti")
mohoReader.Update()
mohoArray = mohoReader.GetOutput().GetPointData().GetArray(0)
mohoReader.GetOutput().GetPointData().SetScalars(mohoArray)

icdReader = vtk.vtkXMLImageDataReader()
icdReader.SetFileName("icd.vti")
icdReader.Update()
icdArray = icdReader.GetOutput().GetPointData().GetArray(0)
icdReader.GetOutput().GetPointData().SetScalars(icdArray)

topoReader = vtk.vtkXMLImageDataReader()
topoReader.SetFileName("topo.vti")
topoReader.Update()
topoArray = topoReader.GetOutput().GetPointData().GetArray(0)
topoReader.GetOutput().GetPointData().SetScalars(topoArray)
"""
###############################################################################
################################### Filters ###################################
###############################################################################

geometryFilter = vtk.vtkImageDataGeometryFilter()
geometryFilter.SetInputConnection(reader.GetOutputPort())
geometryFilter.Update()
"""
labSlabTriangles = vtk.vtkDataSetTriangleFilter()
labSlabTriangles.SetInputConnection(labSlabReader.GetOutputPort())
labSlabTriangles.Update()

mohoTriangles = vtk.vtkDataSetTriangleFilter()
mohoTriangles.SetInputConnection(mohoReader.GetOutputPort())
mohoTriangles.Update()

icdTriangles = vtk.vtkDataSetTriangleFilter()
icdTriangles.SetInputConnection(icdReader.GetOutputPort())
icdTriangles.Update()

topoTriangles = vtk.vtkDataSetTriangleFilter()
topoTriangles.SetInputConnection(topoReader.GetOutputPort())
topoTriangles.Update()

labSlabWarp = vtk.vtkWarpScalar()
labSlabWarp.SetInputConnection(labSlabTriangles.GetOutputPort())
labSlabWarp.Update()
print labSlabWarp.GetOutput().GetBounds()

mohoWarp = vtk.vtkWarpScalar()
mohoWarp.SetInputConnection(mohoTriangles.GetOutputPort())
mohoWarp.Update()

icdWarp = vtk.vtkWarpScalar()
icdWarp.SetInputConnection(icdTriangles.GetOutputPort())
icdWarp.Update()

topoWarp = vtk.vtkWarpScalar()
topoWarp.SetInputConnection(topoTriangles.GetOutputPort())
topoWarp.Update()
"""
plane = vtk.vtkPlane()
plane.SetOrigin(0,0,100)
plane.SetNormal(0,0,1)

cutter = vtk.vtkCutter()
cutter.SetCutFunction(plane)
cutter.SetInputConnection(reader.GetOutputPort())
cutter.Update()

extractVOI = vtk.vtkExtractVOI()
extractVOI.SetInputData(reader.GetOutput())
extractVOI.SetVOI(0,100,0,175,20,20)
extractVOI.GetOutput().GetPointData().SetScalars(array)
print "voi", extractVOI.GetOutput().GetPointData().GetScalars()
#extractVOI.GetOutput().GetPointData().SetScalars(array)
extractVOI.Update()

###############################################################################
################################### Mappers ###################################
###############################################################################

mapper = vtk.vtkDataSetMapper()
#mapper = vtk.vtkPolyDataMapper()
a, b = reader.GetOutput().GetPointData().GetArray(0).GetRange()
mapper.SetScalarRange(a, b)
#mapper.ScalarVisibilityOn()
#mapper.SetInputConnection(geometryFilter.GetOutputPort())
mapper.SetInputConnection(reader.GetOutputPort())
#mapper.SetInputConnection(imageDataGeometryFilter.GetOutputPort())
lut = mapper.GetLookupTable()
#lut.SetNanColor(0,0,0,0)
#mapper.SetLookupTable(lut)
"""
labSlabMapper = vtk.vtkDataSetMapper()
labSlabMapper.SetInputConnection(labSlabWarp.GetOutputPort())
labSlabMapper.ScalarVisibilityOff()

mohoMapper = vtk.vtkDataSetMapper()
mohoMapper.SetInputConnection(mohoWarp.GetOutputPort())
mohoMapper.ScalarVisibilityOff()

icdMapper = vtk.vtkDataSetMapper()
icdMapper.SetInputConnection(icdWarp.GetOutputPort())
icdMapper.ScalarVisibilityOff()

topoMapper = vtk.vtkDataSetMapper()
topoMapper.SetInputConnection(topoWarp.GetOutputPort())
topoMapper.ScalarVisibilityOff()
"""
sliceMapper = vtk.vtkDataSetMapper()
sliceMapper.SetInputConnection(cutter.GetOutputPort())
sliceMapper.SetScalarRange(a, b)

"""
sliceMapper = vtk.vtkPolyDataMapper2D()
a, b = reader.GetOutput().GetPointData().GetArray(0).GetRange()
sliceMapper.SetScalarRange(a, b)
print cutter.GetOutput().GetClassName()
sliceMapper.SetInputData(cutter.GetOutput())
"""
###############################################################################
################################### Actors ####################################
###############################################################################

actor = vtk.vtkActor()
actor.SetMapper(mapper)
#actor.VisibilityOff()
context = actor.GetProperty()
context.SetRepresentationToWireframe()
"""
labSlabActor = vtk.vtkActor()
labSlabActor.SetMapper(labSlabMapper)
labSlabContext = labSlabActor.GetProperty()
labSlabContext.SetDiffuseColor(1, 0, 0)
labSlabActor.VisibilityOff()

mohoActor = vtk.vtkActor()
mohoActor.SetMapper(mohoMapper)
mohoContext = mohoActor.GetProperty()
mohoContext.SetDiffuseColor(0, 1, 0)
mohoActor.VisibilityOff()

icdActor = vtk.vtkActor()
icdActor.SetMapper(icdMapper)
icdContext = icdActor.GetProperty()
icdContext.SetDiffuseColor(0, 0, 1)
icdActor.VisibilityOff()

topoActor = vtk.vtkActor()
topoActor.SetMapper(topoMapper)
topoContext = topoActor.GetProperty()
topoContext.SetDiffuseColor(1, 1, 0)
topoActor.VisibilityOff()
"""

sliceActor = vtk.vtkActor()
sliceActor.SetMapper(sliceMapper)
"""
sliceActor = vtk.vtkImageActor()
sliceActor.GetMapper().SetInputData(extractVOI.GetOutput())
#sliceActor.GetMapper().SetScalarRange(a, b)
sliceActor.GetProperty().SetLookupTable(lut)
print sliceActor.GetProperty().GetColorLevel()
#sliceActor.GetProperty().UseLookupTableScalarRangeOn()
#sliceActor.InterpolateOn()
#sliceActor.SetOpacity(50)
#sliceActor.SetColor(1,1,0)
"""
"""
sliceActor = vtk.vtkActor2D()
#sliceActor.GetProperty().SetColor(1, 1, 0)
#sliceActor.GetProperty().SetEdgeColor(0, 1, 0)
#sliceActor.GetProperty().SetLineWidth(2)
#sliceActor.GetProperty().EdgeVisibilityOn()
sliceActor.SetMapper(sliceMapper)
print "coord", sliceActor.GetPositionCoordinate()
#sliceActor.VisibilityOff()
"""

## Display axes
transform = vtk.vtkTransform()
transform.Translate(1.0, 0.0, 0.0)
axes = vtk.vtkAxesActor()
axes.SetTotalLength(20,20,20)
#print axes.SetXAxisLabelText()
axes.GetXAxisCaptionActor2D().GetCaptionTextProperty().SetFontSize(25)
#print axes.GetXAxisCaptionActor2D().GetCaptionTextProperty().SetColor(1,1,0)
axes.GetXAxisCaptionActor2D().GetTextActor().SetTextScaleMode(0)
axes.GetYAxisCaptionActor2D().GetCaptionTextProperty().SetFontSize(25)
axes.GetYAxisCaptionActor2D().GetTextActor().SetTextScaleMode(0)
axes.GetZAxisCaptionActor2D().GetCaptionTextProperty().SetFontSize(25)
axes.GetZAxisCaptionActor2D().GetTextActor().SetTextScaleMode(0)
axes.SetUserTransform(transform)

###############################################################################
################################## Rendering ##################################
###############################################################################

renderer = vtk.vtkRenderer()
renderer.AddActor(actor)
"""
renderer.AddActor(labSlabActor)
renderer.AddActor(mohoActor)
renderer.AddActor(icdActor)
renderer.AddActor(topoActor)
"""
renderer.AddActor(axes)
renderer.SetBackground(0,0,0)
renderer.SetViewport(0,0,0.5,1)
renderer.ResetCamera()

sliceRenderer = vtk.vtkRenderer()
sliceRenderer.AddActor(sliceActor)
#sliceRenderer.AddActor(axes)
sliceRenderer.SetBackground(0,0,0)
sliceRenderer.SetViewport(0.5,0,1,1)
#sliceRenderer.ResetCamera()

renwin = vtk.vtkRenderWindow()
renwin.AddRenderer(renderer)
renwin.AddRenderer(sliceRenderer)
renwin.SetSize(1600,800)

###############################################################################
################################# Interactor ##################################
###############################################################################

iren = vtk.vtkRenderWindowInteractor()
iren.SetRenderWindow(renwin)

widget = vtk.vtkImplicitPlaneWidget()
print cutter.GetOutput().GetBounds()
print reader.GetOutput().GetBounds()
print "bounds", reader.GetOutput().GetBounds()
widget.PlaceWidget((-100.0, 200.0, -100.0, 275.0, -100.0, 283.0))
widget.SetOrigin([plane.GetOrigin()[x] for x in 0,1,2])
widget.SetNormal([plane.GetNormal()[x] for x in 0,1,2])

widget.SetInteractor(iren)

def eventhandler(obj,event):
    global plane
    obj.GetPlane(plane)
    #sliceRenderer.ResetCamera()
widget.AddObserver("InteractionEvent", eventhandler)

widget.SetEnabled(1)
widget.DrawPlaneOn()
widget.TubingOn()

iren.Initialize()
renwin.Render()

iren.Start()
