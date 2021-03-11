class dictRules:
    """
    A special class for getting and setting multiple dictionaries
    simultaneously. This class is not meant to be instantiated
    in its own, but rather in response to a slice operation on UniformDictList.
    """

    def __init__(parent,slice):
        self.parent = parent
        self.range = range(*slice.indices(len(parent)))

    def keys(self):
        keySet = set()
        for i in self.range:
            keySet &= self.parent.keys()
        return keySet

    def getItem(self,key):
        return [self.parent[k][key] for k in self.range]

    def setItem(self, key, val):
        for k in self.range:
            self.parent[k][key] = val

    def update(self, *args, **kargs):
        for k in self.range:
            self.parent[k].update(*args,**kargs)

class UniformDictList(list):
    def getItem(self,key):
        if isinstance(key, slice):
            return dictRules(self, key)
        return super().getItem(key)
